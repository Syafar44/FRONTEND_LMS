import DashboardLayout from "@/components/layouts/DashboardLayout"
import Managerial from "@/components/views/Competency/Managerial"

const ManagerialPage = () => {
    return (
        <DashboardLayout title="Managerial Competency" type="user">
            <Managerial />
        </DashboardLayout>
    )
}

export default ManagerialPage