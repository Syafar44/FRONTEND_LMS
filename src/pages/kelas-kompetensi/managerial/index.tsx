import DashboardLayout from "@/components/layouts/DashboardLayout"
import Competency from "@/components/views/Competency"

const ManagerialPage = () => {
    return (
        <DashboardLayout title="Managerial Competency" type="user">
            <Competency />
        </DashboardLayout>
    )
}

export default ManagerialPage