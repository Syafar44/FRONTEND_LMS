import PageHead from "@/components/commons/PageHead"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import SubDashboardLayout from "@/components/layouts/SubDashboardLayout/SubDashboardLayout"
import Resume from "@/components/views/DetailKajian/Resume"


const ResumePage = () => {
    return (
        <SubDashboardLayout>
            <PageHead title="resume kajian" />
            <Resume />
        </SubDashboardLayout>
    )
}

export default ResumePage