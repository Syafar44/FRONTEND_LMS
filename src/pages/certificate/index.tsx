import DashboardLayout from "@/components/layouts/DashboardLayout"
import Certificate from "@/components/views/Certificate"


const CertificatePage = () => {
    return (
        <DashboardLayout title="Sertifikat" type="user">
            <Certificate />
        </DashboardLayout>
    )
}

export default CertificatePage
