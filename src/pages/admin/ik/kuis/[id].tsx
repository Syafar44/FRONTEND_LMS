import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisIk from "@/components/views/Admin/KuisIk";

const AdminKuisIkPage = () => {
  return (
    <DashboardLayout
      title="Kuis IK LMS Panglima"
      description="Ini adalah halaman untuk menambahkan Kuis IK kepada pengguna"
      type="admin"
    >
      <KuisIk />
    </DashboardLayout>
  );
};

export default AdminKuisIkPage;
