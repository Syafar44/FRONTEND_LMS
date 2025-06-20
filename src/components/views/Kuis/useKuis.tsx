import scoreServices from "@/services/score.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useKuis = () => {
    const router = useRouter()
    const { id } =  router.query
    
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