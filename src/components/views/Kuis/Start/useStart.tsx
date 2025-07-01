import completedServices from "@/services/completed.service"
import kuisCompetencyServices from "@/services/kuisCompetency.service"
import saveServices from "@/services/save.service"
import scoreServices from "@/services/score.service"
import subCompetencyServices from "@/services/subCompetency.service"
import { ICompetency } from "@/types/Competency"
import { IScore } from "@/types/Score"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const LOCAL_STORAGE_KEY = "jawaban_kuis"

const useStart = () => {
    const router = useRouter()
    const { id, number  } = router.query
    const [numberSoal, setNumberSoal] = useState(1)
    const [radioSelect, setRadioSelect] = useState<string | null>(null)
    const [jumlahSoal, setJumlahSoal] = useState<number | null>(0)
    const [score, setScore] = useState<number>(0);
    const [listSoal, setListSoal] = useState<any[]>([])

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
        // const getKuis = data.data[numberSoal - 1]
        // return getKuis
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
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
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
    
    const handleRecap = async () => {
        try {
            const lastId = dataCompetency?.[dataCompetency.length - 1]?._id;
            const isFinish = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / Number(jumlahSoal) * 100 >= 80 && lastId === id
            const IsCompeted = dataCompleted?.some((item: {competency: string}) => item.competency === subCompetency?.byCompetency)
            const alreadyPassed = dataScore.some((item: IScore) => item.isPass === true) ?? false;
                await scoreServices.addScore({
                    bySubCompetency: `${id}`,
                    isPass: Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / Number(jumlahSoal) * 100 >= 80,
                    total_question: Number(jumlahSoal),
                    total_score: Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0,
            });
            if(!IsCompeted) {
                console.log('Belum Selesai')
                if(!isFinish) {
                    console.log('Belum Ke Sub Terakhir')
                    if (!alreadyPassed) {
                        console.log('Belum Lulus')
                        if (!dataSave) {
                            console.log('Tambahkan Save')
                            await saveServices.addSave({
                                competency: `${subCompetency.byCompetency}`,
                                progress: 1,
                            });
                        } else {
                            console.log('Update Save')
                            await saveServices.updateSave(`${dataSave?._id}`, {
                                progress: Number(dataSave.progress ?? 0) + 1,
                            });
                        }
                    }
                } else {
                    console.log('Sudah Ke Sub Terakhir')
                    await saveServices.deleteSave(`${dataSave?._id}`)
                    await completedServices.addCompleted(`${subCompetency.byCompetency}`)
                }
            }
            router.push(`/kuis/recap/${id}`);
        } catch (error) {
            console.log('error')
        }
    };


    const [remainingTime, setRemainingTime] = useState(300)

    useEffect(() => {
        if (!router.isReady) return;

        if (remainingTime <= 0) {
            handleRecap();
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime, router.isReady]);

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
    }
}

export default useStart