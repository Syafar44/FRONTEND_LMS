import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSopIk from "@/components/views/Admin/DetailSopIk";

const DetailAdminSopIkPage = () => {
    return (
        <DashboardLayout
            title="Detail SOP & IK LMS Panglima"
            description="Ini adalah halaman untuk mengedit SOP & IK kepada pengguna"
            type="admin"
        >
            <DetailSopIk />
        </DashboardLayout>
    );
};

export default DetailAdminSopIkPage;
