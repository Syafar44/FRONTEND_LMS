import scoreServices from "@/services/score.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useKuis = () => {
    const router = useRouter()
    const { id } =  router.query
    
    useEffect(() => {
        localStorage.removeItem('kuis_timer_start')
    }, [router.isReady])
    
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

    return {
        id,
        router,
        dataScore,
        isPendingScore,
    }
}

export default useKuis