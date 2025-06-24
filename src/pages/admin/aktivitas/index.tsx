import DashboardLayout from "@/components/layouts/DashboardLayout";
import Aktivitas from "@/components/views/Admin/Aktivitas";

const AdminAktivitas = () => {
  return (
    <DashboardLayout
      title="Aktivitas"
      description="Halaman Aktivitas untuk melihat aktivitas yang terjadi."
      type="admin"
    >
      <Aktivitas />
    </DashboardLayout>
  );
};

export default AdminAktivitas;
