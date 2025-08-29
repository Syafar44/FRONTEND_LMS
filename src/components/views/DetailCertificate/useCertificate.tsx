import certificateServices from "@/services/certificate.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCertificate = () => {
    const router = useRouter();
    const { id } = router.query;

    const getCertificateDetail = async () => {
        const res = await certificateServices.getCertificateById(`${id}`);
        const { data } = res
        return data.data
    }

    const {
        data: dataCertificateDetail,
        isPending: isPendingCertificateDetail,
    } = useQuery({
        queryKey: ["CertificateDetail"],
        queryFn: () => getCertificateDetail(),
        enabled: !!router.isReady,
    });

    return {
        dataCertificateDetail,
        isPendingCertificateDetail,
    }
}

export default useDetailCertificate;