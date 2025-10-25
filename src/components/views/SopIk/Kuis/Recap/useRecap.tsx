import competencyServices from "@/services/competency.service"
import scoreServices from "@/services/score.service"
import scoreSopIkServices from "@/services/scoreSopIk.service"
import sopIkServices from "@/services/sopIk.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useRecap = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        localStorage.removeItem('jawaban_kuis')
        localStorage.removeItem('kuis_timer_start')
    }, [router.isReady])

    const getScore = async () => {
        const res = await scoreSopIkServices.getScoreBySopIk(`${id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse[0]
    }

    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["Score"],
        queryFn: getScore,
        enabled: !!id,
    })

    const getSub = async () => {
        const res = await sopIkServices.getSopIkById(`${id}`)
        const { data } = res
        return data.data
    }

    const { data: dataSub, isPending: isPendingSub } = useQuery({
        queryKey: ["SopIk"],
        queryFn: getSub,
        enabled: !!id,
    })

    const totalSoal = dataScore?.total_question
    const totalScore = dataScore?.total_score / dataScore?.total_question * 100

    return {
        dataScore,
        isPendingScore,
        dataSub,
        isPendingSub,
        router,
        totalScore,
        totalSoal
    }
}

export default useRecap