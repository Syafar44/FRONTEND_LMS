import DashboardLayout from "@/components/layouts/DashboardLayout";
import Lkp from "@/components/views/Admin/Lkp";

const AdminLkpPage = () => {
  return (
    <DashboardLayout
      title="Lembar Kepatuhan Pribadi"
      description="Ini adalah halaman Rekap Lembar Kepatuhan Pribadi Semua orang"
      type="admin"
    >
      <Lkp />
    </DashboardLayout>
  );
};

export default AdminLkpPage;
