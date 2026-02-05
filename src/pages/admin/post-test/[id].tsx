import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSopIk from "@/components/views/Admin/DetailSopIk";

const DetailAdminSopIkPage = () => {
    return (
        <DashboardLayout
            title="Detail POST TEST MINGGUAN"
            description="Ini adalah halaman untuk mengedit POST TEST MINGGUAN kepada pengguna"
            type="admin"
        >
            <DetailSopIk />
        </DashboardLayout>
    );
};

export default DetailAdminSopIkPage;
