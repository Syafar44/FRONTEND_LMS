import competencyServices from "@/services/competency.service"
import scoreServices from "@/services/score.service"
import subCompetencyServices from "@/services/subCompetency.service"
import videoServices from "@/services/video.service"
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
        const res = await scoreServices.getScoreBySubCompetency(`${id}`)
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
        const res = await subCompetencyServices.getSubCompetencyById(`${id}`)
        const { data } = res
        return data.data
    }

    const { data: dataSub, isPending: isPendingSub } = useQuery({
        queryKey: ["Sub"],
        queryFn: getSub,
        enabled: !!id,
    })

    const idCompetency = dataSub?.byCompetency

    const getCompetency = async() => {
        const res = await competencyServices.getCompetencyById(`${idCompetency}`)
        const { data } = res
        return data.data
    }

    const { data: dataCompetency, isPending: isPendingCompetency } = useQuery({
        queryKey: ["Competency"],
        queryFn: getCompetency,
        enabled: !!idCompetency,
    })

    const totalSoal = dataScore?.total_question
    const totalScore = dataScore?.total_score / dataScore?.total_question * 100

    const getHistoryVideo = async() => {
        const res = await videoServices.getVideoBySubCompetency(`${dataSub?._id}`)
        const { data } = res
        return data.data
    }

    const { data: dataHistoryVideo, isPending: isPendingHistoryVideo } = useQuery({
        queryKey: ["HistoryVideo"],
        queryFn: getHistoryVideo,
        enabled: !!dataSub?._id,
    })
    useEffect(() => {
        if (dataHistoryVideo) {      
            const deleteScoreIfNeeded = async () => {
                if(totalScore < 80) {
                    await videoServices.deleteVideo(`${dataHistoryVideo?._id}`)
                }
            }
            deleteScoreIfNeeded()
        }
    },[totalScore])

    return {
        dataScore,
        isPendingScore,
        dataSub,
        isPendingSub,
        dataCompetency,
        isPendingCompetency,
        router,
        totalScore,
        totalSoal
    }
}

export default useRecap