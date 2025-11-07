import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisSop from "@/components/views/Admin/KuisSop";

const AdminKuisSopPage = () => {
  return (
    <DashboardLayout
      title="Kuis SOP LMS Panglima"
      description="Ini adalah halaman untuk menambahkan Kuis SOP kepada pengguna"
      type="admin"
    >
      <KuisSop />
    </DashboardLayout>
  );
};

export default AdminKuisSopPage;
