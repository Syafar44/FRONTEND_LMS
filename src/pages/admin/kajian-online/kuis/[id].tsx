import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisKajian from "@/components/views/Admin/KuisKajian";

const AdminKuisKajianPage = () => {
  return (
    <DashboardLayout
      title="Kuis IK LMS Panglima"
      description="Ini adalah halaman untuk menambahkan Kuis IK kepada pengguna"
      type="admin"
    >
      <KuisKajian />
    </DashboardLayout>
  );
};

export default AdminKuisKajianPage;
