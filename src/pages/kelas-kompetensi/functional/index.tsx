import DashboardLayout from "@/components/layouts/DashboardLayout"
import Competency from "@/components/views/Competency"

const FunctionalPage = () => {
    return (
        <DashboardLayout title="Functional Competency" type="user">
            <Competency />
        </DashboardLayout>
    )
}

export default FunctionalPage