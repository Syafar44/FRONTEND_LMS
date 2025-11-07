import useChangeUrl from "@/hooks/useChangeUrl";
import ikServices from "@/services/ik.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useIk = () => {
    const router = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getIk = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await ikServices.getAllIk(params)
        const { data } = res
        return data
    }

    const {
        data: dataIk,
        isPending: isPendingIk,
        isFetching: isFetchingIk,
    } = useQuery({
        queryKey: ["Ik", currentLimit, currentPage, currentSearch],
        queryFn: getIk,
        enabled: !!router.isReady
    })

    return {
        dataIk,
        isPendingIk,
        isFetchingIk,
    }
}

export default useIk