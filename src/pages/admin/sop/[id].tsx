import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSop from "@/components/views/Admin/DetailSop";

const DetailAdminSopPage = () => {
    return (
        <DashboardLayout
            title="Detail POST TEST MINGGUAN"
            description="Ini adalah halaman untuk mengedit POST TEST MINGGUAN kepada pengguna"
            type="admin"
        >
            <DetailSop />
        </DashboardLayout>
    );
};

export default DetailAdminSopPage;
