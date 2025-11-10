import scoreKajianServices from "@/services/scoreKajian.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import kajianServices from "@/services/kajian.service"

const TOTAL_TIME = 300 * 2
export const COUNTDOWN = "countdown_kajian"

const useKuis = () => {
    const router = useRouter()
    const { id } =  router.query

    const getKajian = async() => {
        const res = await kajianServices.getKajianById(`${id}`)
        const { data } = res
        return data.data
    }

    const { data: dataKajian, isPending: isPendingKajian } = useQuery({
        queryKey: ["getKajian", id],
        queryFn: getKajian,
        enabled: !!id
    })

    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    // Hapus timer lama ketKajiana halaman siap
    useEffect(() => {
        if (router.isReady) {
            localStorage.removeItem("kuis_timer_start");
        }
    }, [router.isReady]);

    // Jalankan timer ketKajiana dataKajian sudah tersedia
    useEffect(() => {
        // if (!router.isReady || !dataKajian?.countdown) return;

        let startTime = localStorage.getItem(COUNTDOWN);

        const start = Number(startTime);
        const interval = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - start) / 1000);
        const remaining = TOTAL_TIME - elapsedSeconds;

        if (remaining <= 0) {
            setRemainingTime(0);
            clearInterval(interval);
        } else {
            setRemainingTime(remaining);
        }
        }, 1000);

        return () => clearInterval(interval);
    }, [router.isReady, dataKajian]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null || isNaN(seconds)) return "Memuat waktu...";
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
    
    const getAllScore = async() => {
        const res = await scoreKajianServices.getScoreByKajian(`${id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }

    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScoreKajian", id],
        queryFn: getAllScore,
        enabled: !!id
    })

    const getScoreLasted = async () => {
        const res = await scoreKajianServices.getScoreAllByUser()
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
        id: dataKajian?._id,
        dataKajian,
        isPendingKajian,
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