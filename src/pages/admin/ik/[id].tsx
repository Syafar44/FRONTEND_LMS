import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailIk from "@/components/views/Admin/DetailIk";

const DetailAdminSopIkPage = () => {
    return (
        <DashboardLayout
            title="Detail POST TEST MINGGUAN"
            description="Ini adalah halaman untuk mengedit POST TEST MINGGUAN kepada pengguna"
            type="admin"
        >
            <DetailIk />
        </DashboardLayout>
    );
};

export default DetailAdminSopIkPage;
