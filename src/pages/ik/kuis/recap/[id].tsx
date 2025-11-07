import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Recap from "@/components/views/DetailIk/Kuis/Recap"

const RecapIkPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Recap Lms Panglima" />
            <Recap />
        </SubDashboardLayout>
    )
}

export default RecapIkPage