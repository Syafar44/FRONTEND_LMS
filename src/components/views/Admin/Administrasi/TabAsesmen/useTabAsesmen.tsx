import useChangeUrl from "@/hooks/useChangeUrl";
import asesmenServices from "@/services/asesmen.service";
import partAsesmenServices from "@/services/partAsesmen.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabAsesmen = () => {
    const router = useRouter();
    
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    
    const getAsesmen = async () => {
        const res = await asesmenServices.getAsesmen();
        const { data } = res;
        return data;
    }
    
    const {
        data: dataAsesmen,
        isLoading: isLoadingAsesmen,
        isRefetching: isRefetchingAsesmen,
        refetch: refetchAsesmen,
    } = useQuery({
        queryKey: ["Asesmen"],
        queryFn: () => getAsesmen(),
        enabled: router.isReady 
    });

    const getPartAsesmen = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await partAsesmenServices.getPartAsesmen(params);
        const { data } = res;
        return data;
    }
    
    const {
        data: dataPartAsesmen,
        isLoading: isLoadingPartAsesmen,
        isRefetching: isRefetchingPartAsesmen,
        refetch: refetchPartAsesmen,
    } = useQuery({
        queryKey: ["PartAsesmen", currentPage, currentLimit, currentSearch],
        queryFn: () => getPartAsesmen(),
        enabled: router.isReady || !!currentPage || !!currentLimit,
    });
    
    return {
        dataAsesmen,
        isLoadingAsesmen,
        isRefetchingAsesmen,
        refetchAsesmen,
        dataPartAsesmen,
        isLoadingPartAsesmen,
        isRefetchingPartAsesmen,
        refetchPartAsesmen,
    }
}

export default useTabAsesmen