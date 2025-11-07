import useChangeUrl from "@/hooks/useChangeUrl";
import sopServices from "@/services/sop.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useSop = () => {
    const router = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getSop = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await sopServices.getAllSop(params)
        const { data } = res
        return data
    }

    const {
        data: dataSop,
        isPending: isPendingSop,
        refetch: refetchSop,
    } = useQuery({
        queryKey: ["getSop", currentLimit, currentPage, currentSearch],
        queryFn: getSop,
        enabled: !!router.isReady
    })

    return {
        dataSop,
        isPendingSop,
        refetchSop,
        router,
    }
}

export default useSop