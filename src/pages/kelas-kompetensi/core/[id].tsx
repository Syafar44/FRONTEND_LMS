import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailCompetency from "@/components/views/DetailCompetency"


const CoreDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Core Competency" />
            <DetailCompetency />
        </SubDashboardLayout>
    )
}

export default CoreDetailPage