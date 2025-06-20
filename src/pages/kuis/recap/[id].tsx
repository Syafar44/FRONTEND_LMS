import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Recap from "@/components/views/Kuis/Recap"

const RecapPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Recap Lms Panglima" />
            <Recap />
        </SubDashboardLayout>
    )
}

export default RecapPage