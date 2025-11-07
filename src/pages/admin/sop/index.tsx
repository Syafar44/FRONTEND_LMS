import DashboardLayout from "@/components/layouts/DashboardLayout";
import Sop from "@/components/views/Admin/Sop";

const AdminSopPage = () => {
  return (
    <DashboardLayout
      title="SOP LMS Panglima"
      description="Ini adalah halaman untuk menambahkan SOP kepada pengguna"
      type="admin"
    >
      <Sop />
    </DashboardLayout>
  );
};

export default AdminSopPage;
