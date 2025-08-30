import useChangeUrl from "@/hooks/useChangeUrl";
import certificateServices from "@/services/certificate.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCertificate = () => {
    const router = useRouter();
    const { currentLimit, currentPage } = useChangeUrl();

    const getCertificate = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        const res = await certificateServices.getCertificateByUser(params);
        const { data } = res
        return data
    }

    const {
        data: dataCertificate,
        isLoading: isLoadingCertificate,
        isRefetching: isRefetchingCertificate,
        refetch: refetchCertificate,
    } = useQuery({
        queryKey: ["Certificate", currentPage, currentLimit],
        queryFn: () => getCertificate(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    return {
        dataCertificate,
        isLoadingCertificate,
        isRefetchingCertificate, 
        refetchCertificate,
    }
}

export default useCertificate;