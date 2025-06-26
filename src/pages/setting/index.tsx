import DashboardLayout from "@/components/layouts/DashboardLayout"
import Setting from "@/components/views/Setting"


const SettingPage = () => {
    return (
        <DashboardLayout title="Pengaturan" type="user">
            <Setting />
        </DashboardLayout>
    )
}

export default SettingPage