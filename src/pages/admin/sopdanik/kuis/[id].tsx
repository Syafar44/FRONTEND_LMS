import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisSopIk from "@/components/views/Admin/KuisSopIk";

const AdminKuisSopIkPage = () => {
  return (
    <DashboardLayout
      title="Kuis SOP & IK LMS Panglima"
      description="Ini adalah halaman untuk menambahkan Kuis SOP & IK kepada pengguna"
      type="admin"
    >
      <KuisSopIk />
    </DashboardLayout>
  );
};

export default AdminKuisSopIkPage;
