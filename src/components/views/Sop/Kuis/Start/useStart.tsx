import kuisSopServices from "@/services/kuisSop.service"
import scoreSopServices from "@/services/scoreSop.service"
import sopServices from "@/services/sop.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Swal from "sweetalert2"

const LOCAL_STORAGE_KEY = "jawaban_kuis"
const TOTAL_TIME = 300 * 2
const TIMER_STORAGE_KEY = "kuis_timer_start"
const COUNTDOWN = "countdown_sop"

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
        const params = `limit=${99999}`
        const res = await kuisSopServices.getKuisSopBySop(`${id}`, params)
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
        queryKey: ['kuisSop', id, numberSoal],
        queryFn: getKuis,
        enabled: !!id
    });

    console.log("dataKuis:", dataKuis);

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
        const res = await sopServices.getSopById(`${id}`)
        const { data } = res
        return data.data
    }

    const {
        data: subCompetency,
        isPending: isPendingSubCompetency,
    } = useQuery({
        queryKey: ["getSop", id],
        queryFn: getSubCompetency,
        enabled: !!id,
    })
    
    const getAllScore = async() => {
        const res = await scoreSopServices.getScoreBySop(`${id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }
    
    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScore"],
        queryFn: getAllScore,
        enabled: !!id,
    })
    
    const handleRecap = useCallback(async () => {
        if (!id || !jumlahSoal || !subCompetency) {
            return;
        }
        if (isLoading) return;

        try {
            setIsLoading(true);
            const score = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0;
            const total = Number(jumlahSoal);
            const percent = (score / total) * 100;
            const isPass = percent >= 80;

            Swal.fire({
                title: 'Selesai',
                text: 'Anda telah menyelesaan kuis ini.',
                icon: 'success',
                confirmButtonText: 'Lihat Hasil',
                customClass: {
                    confirmButton: 'bg-primary text-black hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
                }
            })
            await scoreSopServices.addScore({
                bySop: `${id}`,
                isPass,
                total_question: total,
                total_score: score,
            });
            const now = Date.now();
            localStorage.setItem(COUNTDOWN, now.toString());
            localStorage.removeItem(TIMER_STORAGE_KEY);
            router.replace(`/sop/kuis/recap/${id}`);
        } catch (error) {
            console.error("Gagal menyelesaan recap:", error);
        } finally {
            setIsLoading(false);
        }
    }, [
        id,
        jumlahSoal,
        dataScore,
        subCompetency,
        router
    ]);

    const [remainingTime, setRemainingTime] = useState(Number(subCompetency?.duration))

    useEffect(() => {
        if (!router.isReady) return;

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
            const remaining = Number(subCompetency?.duration) - elapsedSeconds;

            if (remaining <= 0) {
                handleRecap();
                setRemainingTime(0);
                clearInterval(interval);
            } else {
                setRemainingTime(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [router.isReady, id, handleRecap]);

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
        isPendingScore,
        subCompetency,
        isPendingSubCompetency,

        remainingTime,
        formattedTime: formatTime(remainingTime),
        isLoading,
    }
}

export default useStart