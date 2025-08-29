import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailCertificate from "@/components/views/DetailCertificate"

const CertificateDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Sertifikat" />
            <DetailCertificate />
        </SubDashboardLayout>
    )
}

export default CertificateDetailPage