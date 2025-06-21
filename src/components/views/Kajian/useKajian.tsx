import useChangeUrl from "@/hooks/useChangeUrl";
import kajianServices from "@/services/kajian.service";
import resumeServices from "@/services/resume.service";
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
    } = useQuery({
        queryKey: ["Kajian", currentLimit, currentPage, currentSearch],
        queryFn: getKajian,
        enabled: !!router.isReady
    })

    const getResume = async () => {
        const res = await resumeServices.getResumeAll() 
        const { data } = res
        return data
    }

    const {
        data: dataResume,
        isPending: isPendingResume,
    } = useQuery({
        queryKey: ["Resume", currentLimit, currentPage, currentSearch],
        queryFn: getResume,
        enabled: !!router.isReady
    })

    return {
        dataKajian,
        isPendingKajian,
        dataResume,
        isPendingResume,
    }
}

export default useKajian