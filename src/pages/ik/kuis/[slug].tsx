import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Kuis from "@/components/views/DetailIk/Kuis"


const KuisIkIkPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Kuis Lms Panglima" />
            <Kuis />
        </SubDashboardLayout>
    )
}

export default KuisIkIkPage