import DashboardLayout from "@/components/layouts/DashboardLayout"
import Competency from "@/components/views/Competency"


const CorePage = () => {
    return (
        <DashboardLayout title="Core Competency" type="user">
            <Competency />
        </DashboardLayout>
    )
}

export default CorePage