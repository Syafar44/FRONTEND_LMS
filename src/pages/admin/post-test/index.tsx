import DashboardLayout from "@/components/layouts/DashboardLayout";
import SopIk from "@/components/views/Admin/SopIk";

const AdminSopIkPage = () => {
  return (
    <DashboardLayout
      title="POST TEST MINGGUAN"
      description="Ini adalah halaman untuk menambahkan POST TEST MINGGUAN kepada pengguna"
      type="admin"
    >
      <SopIk />
    </DashboardLayout>
  );
};

export default AdminSopIkPage;
