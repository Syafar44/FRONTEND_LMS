import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisSopIk from "@/components/views/Admin/KuisSopIk";

const AdminKuisSopIkPage = () => {
  return (
    <DashboardLayout
      title="Kuis POST TEST MINGGUAN"
      description="Ini adalah halaman untuk menambahkan Kuis POST TEST MINGGUAN kepada pengguna"
      type="admin"
    >
      <KuisSopIk />
    </DashboardLayout>
  );
};

export default AdminKuisSopIkPage;
