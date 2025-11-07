import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailIk from "@/components/views/Admin/DetailIk";

const DetailAdminSopIkPage = () => {
    return (
        <DashboardLayout
            title="Detail SOP & IK LMS Panglima"
            description="Ini adalah halaman untuk mengedit SOP & IK kepada pengguna"
            type="admin"
        >
            <DetailIk />
        </DashboardLayout>
    );
};

export default DetailAdminSopIkPage;
