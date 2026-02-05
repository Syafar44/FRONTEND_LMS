import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisAsesmen from "@/components/views/Admin/KuisAsesmen";

const AdminKuisAsesmenPage = () => {
  return (
    <DashboardLayout
      title="Kuis Asesmen LMS Panglima"
      description="Ini adalah halaman untuk menambahkan Kuis Asesmen kepada pengguna"
      type="admin"
    >
      <KuisAsesmen />
    </DashboardLayout>
  );
};

export default AdminKuisAsesmenPage;
