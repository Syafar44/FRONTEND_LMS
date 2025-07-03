import DashboardLayout from "@/components/layouts/DashboardLayout"
import Lkp from "@/components/views/Lkp"


const LkpPage = () => {
    return (
        <DashboardLayout title="Lembar Kepatuhan Pribadi" type="user">
            <Lkp />
        </DashboardLayout>
    )
}

export default LkpPage