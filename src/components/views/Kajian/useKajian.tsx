import useChangeUrl from "@/hooks/useChangeUrl";
import kajianServices from "@/services/kajian.service";
import resumeServices from "@/services/resume.service";
import scoreKajianServices from "@/services/scoreKajian.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useKajian = () => {
    const router = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getKajian = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await kajianServices.getKajian(params)
        const { data } = res
        return data
    }

    const {
        data: dataKajian,
        isPending: isPendingKajian,
        isFetching: isFetchingKajian,
    } = useQuery({
        queryKey: ["Kajian", currentLimit, currentPage, currentSearch],
        queryFn: getKajian,
        enabled: !!router.isReady
    })

    const getResume = async () => {
        const res = await resumeServices.getResumeAllByUser() 
        const { data } = res
        return data
    }

    const {
        data: dataResume,
        isPending: isPendingResume,
    } = useQuery({
        queryKey: ["Resume", router.isReady],
        queryFn: getResume,
        enabled: !!router.isReady
    })

    const getAllScore = async() => {
        const res = await scoreKajianServices.getScoreAllByUser()
        const { data } = res
        return data
    }
    
    const { data: dataScore, isPending: isPendingScore } = useQuery({
        queryKey: ["getAllScore", router.isReady],
        queryFn: getAllScore,
        enabled: !!router.isReady
    })

    return {
        dataKajian,
        isPendingKajian,
        isFetchingKajian,
        dataResume,
        isPendingResume,
        dataScore,
        isPendingScore,
    }
}

export default useKajian