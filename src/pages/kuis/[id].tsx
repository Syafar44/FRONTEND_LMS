import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Kuis from "@/components/views/Kuis"

const KuisPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Kuis Lms Panglima" />
            <Kuis />
        </SubDashboardLayout>
    )
}

export default KuisPage