import DashboardLayout from "@/components/layouts/DashboardLayout"
import Functional from "@/components/views/Competency/Functional"

const FunctionalPage = () => {
    return (
        <DashboardLayout title="Functional Competency" type="user">
            <Functional />
        </DashboardLayout>
    )
}

export default FunctionalPage