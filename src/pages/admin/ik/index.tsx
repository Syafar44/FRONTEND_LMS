import DashboardLayout from "@/components/layouts/DashboardLayout";
import Ik from "@/components/views/Admin/Ik";

const AdminIkPage = () => {
  return (
    <DashboardLayout
      title="IK LMS Panglima"
      description="Ini adalah halaman untuk menambahkan IK kepada pengguna"
      type="admin"
    >
      <Ik />
    </DashboardLayout>
  );
};

export default AdminIkPage;
