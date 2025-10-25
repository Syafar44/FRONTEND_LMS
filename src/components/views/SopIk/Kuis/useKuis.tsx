import scoreServices from "@/services/score.service"
import scoreSopIkServices from "@/services/scoreSopIk.service"
import sopIkServices from "@/services/sopIk.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useKuis = () => {
    const router = useRouter()
    const { slug } =  router.query
    
    useEffect(() => {
        localStorage.removeItem('kuis_timer_start')
    }, [router.isReady])


    const getSopIk = async() => {
        const res = await sopIkServices.getSopIkBySlug(`${slug}`)
        const { data } = res
        return data.data
    }

    const { data: dataSopIk, isPending: isPendingSopIk } = useQuery({
        queryKey: ["getSopIk", slug],
        queryFn: getSopIk,
        enabled: !!slug
    })
    
    const getAllScore = async() => {
        const res = await scoreSopIkServices.getScoreBySopIk(`${dataSopIk._id}`)
        const { data } = res
        const reverse = data.data.reverse()
        return reverse
    }

    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScoreSopIk", dataSopIk?._id],
        queryFn: getAllScore,
        enabled: !!dataSopIk?._id
    })

    return {
        id: dataSopIk?._id,
        dataSopIk,
        isPendingSopIk,
        router,
        dataScore,
        isPendingScore,
    }
}

export default useKuis