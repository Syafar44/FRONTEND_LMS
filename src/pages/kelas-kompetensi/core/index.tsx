import DashboardLayout from "@/components/layouts/DashboardLayout"
import Core from "@/components/views/Competency/Core"

const CorePage = () => {
    return (
        <DashboardLayout title="Core Competency" type="user">
            <Core />
        </DashboardLayout>
    )
}

export default CorePage