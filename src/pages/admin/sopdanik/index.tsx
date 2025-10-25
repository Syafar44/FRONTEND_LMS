import DashboardLayout from "@/components/layouts/DashboardLayout";
import SopIk from "@/components/views/Admin/SopIk";

const AdminSopIkPage = () => {
  return (
    <DashboardLayout
      title="SOP & IK LMS Panglima"
      description="Ini adalah halaman untuk menambahkan SOP & IK kepada pengguna"
      type="admin"
    >
      <SopIk />
    </DashboardLayout>
  );
};

export default AdminSopIkPage;
