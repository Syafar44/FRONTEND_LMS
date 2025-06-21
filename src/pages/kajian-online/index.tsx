import DashboardLayout from "@/components/layouts/DashboardLayout"
import Kajian from "@/components/views/Kajian"


const KajianPage = () => {
    return (
        <DashboardLayout title="Kajian Online" type="user">
            <Kajian />
        </DashboardLayout>
    )
}

export default KajianPage