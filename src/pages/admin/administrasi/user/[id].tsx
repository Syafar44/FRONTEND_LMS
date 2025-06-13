import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailUser from "@/components/views/Admin/DetailUser";


const AdminDetailUserPage = () => {
  return (
    <DashboardLayout
      title="Detail User"
      description="Halaman detail user untuk melihat dan mengelola informasi pengguna."
      type="admin"
    >
      <DetailUser />
    </DashboardLayout>
  );
};

export default AdminDetailUserPage;
