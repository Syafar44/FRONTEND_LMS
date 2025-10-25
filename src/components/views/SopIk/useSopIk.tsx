import useChangeUrl from "@/hooks/useChangeUrl";
import scoreSopIkServices from "@/services/scoreSopIk.service";
import sopIkServices from "@/services/sopIk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useSopIk = () => {
    const router = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getSopIk = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await sopIkServices.getAllSopIk(params)
        const { data } = res
        return data
    }

    const {
        data: dataSopIk,
        isPending: isPendingSopIk,
        refetch: refetchSopIk,
    } = useQuery({
        queryKey: ["getSopIk", currentLimit, currentPage, currentSearch],
        queryFn: getSopIk,
        enabled: !!router.isReady
    })

    return {
        dataSopIk,
        isPendingSopIk,
        refetchSopIk,
        router,
    }
}

export default useSopIk