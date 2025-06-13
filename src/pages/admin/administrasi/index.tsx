import DashboardLayout from "@/components/layouts/DashboardLayout";
import Administrasi from "@/components/views/Admin/Administrasi";

const AdminAdministrasi = () => {
  return (
    <DashboardLayout
      title="Administrasi"
      description="Halaman administrasi untuk mengelola data dan pengaturan sistem."
      type="admin"
    >
      <Administrasi />
    </DashboardLayout>
  );
};

export default AdminAdministrasi;
