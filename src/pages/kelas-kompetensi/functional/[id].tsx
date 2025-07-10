import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailCompetency from "@/components/views/DetailCompetency"

const FunctionalDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Functional Competency" />
            <DetailCompetency />
        </SubDashboardLayout>
    )
}

export default FunctionalDetailPage