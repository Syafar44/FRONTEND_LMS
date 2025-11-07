import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSop from "@/components/views/Admin/DetailSop";

const DetailAdminSopPage = () => {
    return (
        <DashboardLayout
            title="Detail SOP & IK LMS Panglima"
            description="Ini adalah halaman untuk mengedit SOP & IK kepada pengguna"
            type="admin"
        >
            <DetailSop />
        </DashboardLayout>
    );
};

export default DetailAdminSopPage;
