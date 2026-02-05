import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Recap from "@/components/views/SopIk/Kuis/Recap"

const RecapSopIkPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Recap Lms Panglima" />
            <Recap />
        </SubDashboardLayout>
    )
}

export default RecapSopIkPage