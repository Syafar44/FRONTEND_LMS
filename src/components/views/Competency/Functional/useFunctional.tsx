import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service"
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useFunctional = () => {
    const router = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getCourse = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await competencyServices.getCompetencyByMainCompetency("functional", params)
        const { data } = res
        return data
    }

    const {
        data: dataCourse,
        isPending: isPendingCourse,
        refetch: refetchCourse,
    } = useQuery({
        queryKey: ["get-course", currentLimit, currentPage, currentSearch],
        queryFn: getCourse,
        enabled: !!router.isReady
    })

    return {
        dataCourse,
        isPendingCourse,
        refetchCourse
    }
}

export default useFunctional