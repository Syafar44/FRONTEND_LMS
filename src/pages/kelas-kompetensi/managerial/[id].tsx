import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailCompetency from "@/components/views/DetailCompetency"


const ManagerialDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Managerial Competency" />
            <DetailCompetency />
        </SubDashboardLayout>
    )
}

export default ManagerialDetailPage