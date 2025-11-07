import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Recap from "@/components/views/Sop/Kuis/Recap"

const RecapSopPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Recap Lms Panglima" />
            <Recap />
        </SubDashboardLayout>
    )
}

export default RecapSopPage