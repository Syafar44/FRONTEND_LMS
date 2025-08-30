import certificateServices from "@/services/certificate.service"
import completedServices from "@/services/completed.service"
import kuisCompetencyServices from "@/services/kuisCompetency.service"
import saveServices from "@/services/save.service"
import scoreServices from "@/services/score.service"
import subCompetencyServices from "@/services/subCompetency.service"
import videoServices from "@/services/video.service"
import { ISubCompetency } from "@/types/Competency"
import { IScore } from "@/types/Score"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Swal from "sweetalert2"

const LOCAL_STORAGE_KEY = "jawaban_kuis"
const TOTAL_TIME = 300
const TIMER_STORAGE_KEY = "kuis_timer_start"

const useStart = () => {
    const router = useRouter()
    const { id, number  } = router.query
    const [numberSoal, setNumberSoal] = useState(1)
    const [radioSelect, setRadioSelect] = useState<string | null>(null)
    const [jumlahSoal, setJumlahSoal] = useState<number | null>(0)
    const [score, setScore] = useState<number>(0);
    const [listSoal, setListSoal] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!router.isReady) return
        const queryNumber = typeof number === "string" ? parseInt(number) : NaN
        if (!isNaN(queryNumber) && queryNumber !== numberSoal) {
            const query = { ...router.query, number: numberSoal.toString() }
            router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
        }
    }, [numberSoal, number, router])

    const acakArray = (array: any[]) => {
        return [...array].sort(() => Math.random() - 0.5)
    }

    const getKuis = async() => {
        const res = await kuisCompetencyServices.getKuisCompetencyBySubCompetency(`${id}`)
        const { data } = res
        setJumlahSoal(data.data.length)
        if (listSoal.length === 0) {
            const soalDiacak = acakArray(data.data)
            setListSoal(soalDiacak)
            return soalDiacak[numberSoal - 1]
        } else {
            return listSoal[numberSoal - 1]
        }
    }

    const { data: dataKuis, isPending: isPendingKuis } = useQuery({
        queryKey: ['kuis', id, numberSoal],
        queryFn: getKuis,
        enabled: !!id
    });

    const handleSelect = (select: number, finish: boolean) => {
        if (!finish) {
            setNumberSoal((prev) => prev + 1)
        }
        const prevScore = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0
        const isCorrect = select === dataKuis?.optionValid
        const updatedScore = isCorrect ? prevScore + 1 : prevScore
        localStorage.setItem(LOCAL_STORAGE_KEY, String(updatedScore))
        setScore(Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0)
        setRadioSelect(null)
    }

    useEffect(() => {
        if (router.isReady) {
            localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        }
    }, [router.isReady]);

    const getSubCompetency = async () => {
        const res = await subCompetencyServices.getSubCompetencyById(`${id}`)
        const { data } = res
        return data.data
    }

    const {
        data: subCompetency,
        isPending: isPendingSubCompetency,
    } = useQuery({
        queryKey: ["getSubCompetency", id],
        queryFn: getSubCompetency,
        enabled: !!id,
    })

    const getVideo = async() => {
        const res = await videoServices.getVideoBySubCompetency(`${subCompetency?._id}`)
        const { data } = res
        return data?.data
    }

    const {
        data: dataVideo,
    } = useQuery({
        queryKey: ['video'],
        queryFn: getVideo,
        enabled: !!subCompetency?._id,
    })
    
    const getAllScore = async() => {
        const res = await scoreServices.getScoreBySubCompetency(`${id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }
    
    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScore"],
        queryFn: getAllScore,
        enabled: !!id,
    })
    
    const getSave = async () => {
        const res = await saveServices.getSaveByUser()
        const { data } = res
        return data.data
    }
    
    const { 
        data: dataSave, 
        isPending: isPendingSave 
    } = useQuery({
        queryKey: ['save'],
        queryFn: getSave,
        enabled: !!router.isReady
    })

    const getSubCompetencyByCompetencyId = async() => {
        const res = await subCompetencyServices.getSubCompetencyByCompetency(`${subCompetency?.byCompetency}`)
        const { data } = res
        return data.data
    }

    const { 
        data: dataCompetency, 
    } = useQuery({
        queryKey: ['Competency', subCompetency?.byCompetency],
        queryFn: getSubCompetencyByCompetencyId,
        enabled: !!subCompetency?.byCompetency
    })

    const getCompleted = async () => {
        const res = await completedServices.getCompletedByUser()
        const { data } = res
        return data.data
    }
    
    const { 
        data: dataCompleted, 
        isPending: isPendingCompleted 
    } = useQuery({
        queryKey: ['Completed'],
        queryFn: getCompleted,
        enabled: !!router.isReady
    })

    const getCertificate = async () => {
        let params = `limit=999999999999&page=1`;
        const res = await certificateServices.getCertificateByUser(params);
        const { data } = res
        return data.data
    }

    const {
        data: dataCertificate,
        isPending: isPendingCertificate,
    } = useQuery({
        queryKey: ["Certificate"],
        queryFn: () => getCertificate(),
        enabled: router.isReady,
    });

    const isCompleted = dataCertificate?.some(
            (item: { competency: { _id: string } }) =>
                item.competency._id === (subCompetency as ISubCompetency)?.byCompetency
        )
    
    const handleRecap = useCallback(async () => {
        if (!id || !jumlahSoal || !subCompetency || !subCompetency.byCompetency) {
            return;
        }

        try {
            const score = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0;
            const total = Number(jumlahSoal);
            const percent = (score / total) * 100;
            const isPass = percent >= 80;

            const lastSubId = dataCompetency?.[dataCompetency.length - 1]?._id;
            const isLastSub = lastSubId === id;

            const hasCompleted = dataCompleted?.some(
                (item: {competency: string}) => item.competency === subCompetency?.byCompetency
            );

            const hasPassedBefore = dataScore?.some((item: IScore) => item.isPass) ?? false;

            Swal.fire({
                title: 'Selesai',
                text: 'Anda telah menyelesaikan kuis ini.',
                icon: 'success',
                confirmButtonText: 'Lihat Hasil',
                customClass: {
                    confirmButton: 'bg-primary text-black hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
                }
            })
            // 1. Simpan skor saat ini
            await scoreServices.addScore({
                bySubCompetency: `${id}`,
                isPass,
                total_question: total,
                total_score: score,
            });
            if (!hasCompleted) {
                if (!isLastSub) {
                    if (!hasPassedBefore) {
                        if(!isPass) {
                            await videoServices.deleteVideo(`${dataVideo?._id}`)
                        } else {
                            if (!dataSave) {
                                await saveServices.addSave({
                                    competency: `${subCompetency.byCompetency}`,
                                    progress: 1,
                                    history: `${id}`
                                });
                            } else {
                                await saveServices.updateSave(`${dataSave._id}`, {
                                    progress: Number(dataSave.progress ?? 0) + 1,
                                    history: `${id}`
                                });
                            }
                        }
                    }
                } else {
                    await saveServices.deleteSave(`${dataSave?._id}`);
                    await completedServices.addCompleted(`${subCompetency.byCompetency}`);
                    if(!isCompleted) {
                        await certificateServices.addCertificate({competency: `${subCompetency.byCompetency}`})
                    }
                }
            }
            setIsLoading(true);
            localStorage.removeItem(TIMER_STORAGE_KEY);
            router.replace(`/kuis/recap/${id}`);
        } catch (error) {
            console.error("Gagal menyelesaikan recap:", error);
        }
    }, [
        id,
        jumlahSoal,
        dataCompetency,
        dataCompleted,
        dataScore,
        dataSave,
        subCompetency,
        router
    ]);

    const [remainingTime, setRemainingTime] = useState(TOTAL_TIME)

    useEffect(() => {
        if (!router.isReady) return;

        // Ambil waktu mulai dari localStorage, jika tidak ada set sekarang
        let startTime = localStorage.getItem(TIMER_STORAGE_KEY);

        if (!startTime) {
            const now = Date.now();
            localStorage.setItem(TIMER_STORAGE_KEY, now.toString());
            startTime = now.toString();
        }

        const start = Number(startTime);
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - start) / 1000);
            const remaining = TOTAL_TIME - elapsedSeconds;

            if (remaining <= 0) {
                handleRecap(); // auto submit
                setRemainingTime(0);
                clearInterval(interval);
            } else {
                setRemainingTime(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [router.isReady, id, subCompetency?.byCompetency, handleRecap]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            router.push(router.asPath)
        }

        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [router])

    return{
        id,
        dataKuis, 
        isPendingKuis,
        numberSoal,
        setNumberSoal,
        radioSelect,
        setRadioSelect,
        handleSelect,
        jumlahSoal,
        router,
        score,

        handleRecap,

        isPendingSave,
        isPendingScore,
        subCompetency,
        isPendingSubCompetency,
        isPendingCompleted,

        remainingTime,
        formattedTime: formatTime(remainingTime),
        isLoading,
    }
}

export default useStart