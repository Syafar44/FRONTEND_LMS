import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailCompetency from "@/components/views/DetailCompetency"

const CoreDetailPage = () => {
    return (
        <DashboardLayout type="user">
            <DetailCompetency />
        </DashboardLayout>
    )
}

export default CoreDetailPage