import PageHead from "@/components/commons/PageHead"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import DetailKajian from "@/components/views/DetailKajian"


const KajianDetailPage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="Detail Kajian" />
            <DetailKajian />
        </SubDashboardLayout>
    )
}

export default KajianDetailPage