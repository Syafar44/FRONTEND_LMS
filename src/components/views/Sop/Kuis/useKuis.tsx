import scoreSopServices from "@/services/scoreSop.service"
import sopServices from "@/services/sop.service"
import { convertStandarTime } from "@/utils/date"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const TOTAL_TIME = 300 * 3
export const COUNTDOWN = "countdown"

const useKuis = () => {
    const router = useRouter()
    const { slug } =  router.query
    const [remainingTime, setRemainingTime] = useState(TOTAL_TIME)
    
    useEffect(() => {
        localStorage.removeItem('kuis_timer_start')
    }, [router.isReady])

    
    useEffect(() => {
        if (!router.isReady) return;

        let startTime = localStorage.getItem(COUNTDOWN);

        // if (!startTime) {
        //     const now = Date.now();
        //     localStorage.setItem(COUNTDOWN, now.toString());
        //     startTime = now.toString();
        // }

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
    }, [router.isReady]);
    
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const getSop = async() => {
        const res = await sopServices.getSopBySlug(`${slug}`)
        const { data } = res
        return data.data
    }

    const { data: dataSop, isPending: isPendingSop } = useQuery({
        queryKey: ["getSop", slug],
        queryFn: getSop,
        enabled: !!slug
    })
    
    const getAllScore = async() => {
        const res = await scoreSopServices.getScoreBySop(`${dataSop._id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }

    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScoreSop", dataSop?._id],
        queryFn: getAllScore,
        enabled: !!dataSop?._id
    })

    const getScoreLasted = async () => {
        const res = await scoreSopServices.getScoreAllByUser()
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
        id: dataSop?._id,
        dataSop,
        isPendingSop,
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