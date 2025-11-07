import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailIk from "@/components/views/DetailIk"


const KajianDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Detail Ik" />
            <DetailIk />
        </SubDashboardLayout>
    )
}

export default KajianDetailPage