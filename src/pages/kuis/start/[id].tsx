import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Start from "@/components/views/Kuis/Start"

const KuisPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Kuis Lms Panglima" />
            <Start />
        </SubDashboardLayout>
    )
}

export default KuisPage