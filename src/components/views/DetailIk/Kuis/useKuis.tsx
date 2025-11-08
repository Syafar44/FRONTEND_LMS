import scoreIkServices from "@/services/scoreIk.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ikServices from "@/services/ik.service"

const TOTAL_TIME = 300 * 3
export const COUNTDOWN = "countdown_ik"

const useKuis = () => {
    const router = useRouter()
    const { slug } =  router.query

    const getIk = async() => {
        const res = await ikServices.getIkBySlug(`${slug}`)
        const { data } = res
        return data.data
    }

    const { data: dataIk, isPending: isPendingIk } = useQuery({
        queryKey: ["getIk", slug],
        queryFn: getIk,
        enabled: !!slug
    })

    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    // Hapus timer lama ketika halaman siap
    useEffect(() => {
        if (router.isReady) {
            localStorage.removeItem("kuis_timer_start");
        }
    }, [router.isReady]);

    // Jalankan timer ketika dataIk sudah tersedia
    useEffect(() => {
        if (!router.isReady || !dataIk?.countdown) return;

        let startTime = localStorage.getItem(COUNTDOWN);

        const start = Number(startTime);
        const interval = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - start) / 1000);
        const remaining = Number(dataIk.countdown) - elapsedSeconds;

        if (remaining <= 0) {
            setRemainingTime(0);
            clearInterval(interval);
        } else {
            setRemainingTime(remaining);
        }
        }, 1000);

        return () => clearInterval(interval);
    }, [router.isReady, dataIk]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null || isNaN(seconds)) return "Memuat waktu...";
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    
    const getAllScore = async() => {
        const res = await scoreIkServices.getScoreByIk(`${dataIk._id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }

    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScoreIk", dataIk?._id],
        queryFn: getAllScore,
        enabled: !!dataIk?._id
    })

    const getScoreLasted = async () => {
        const res = await scoreIkServices.getScoreAllByUser()
        const { data } = res
        return data.data
    }

    const {
        data: dataScoreLasted,
        isPending: isPendingScoreLasted,
    } = useQuery({
        queryKey: ["getScoreLasted"],
        queryFn: getScoreLasted,
        enabled: !!router.isReady
    })

    return {
        id: dataIk?._id,
        dataIk,
        isPendingIk,
        router,
        dataScore,
        isPendingScore,
        dataScoreLasted,
        isPendingScoreLasted,
        remainingTime,
        formattedTime: formatTime(remainingTime),
    }
}

export default useKuis