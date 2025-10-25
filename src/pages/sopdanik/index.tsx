import DashboardLayout from "@/components/layouts/DashboardLayout"
import SopIk from "@/components/views/SopIk"

const SopIkPage = () => {
    return (
        <DashboardLayout title="SOP & IK" type="user">
            <SopIk />
        </DashboardLayout>
    )
}

export default SopIkPage