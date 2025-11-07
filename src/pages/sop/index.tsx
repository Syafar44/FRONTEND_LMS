import DashboardLayout from "@/components/layouts/DashboardLayout"
import Sop from "@/components/views/Sop"

const SopPage = () => {
    return (
        <DashboardLayout title="Standard Operating Procedure (SOP)" type="user">
            <Sop />
        </DashboardLayout>
    )
}

export default SopPage