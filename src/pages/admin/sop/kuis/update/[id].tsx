import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisSop from "@/components/views/Admin/DetailKuisSop";

const AdminDetailKuisSopPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Competency"
      description="List of all Detail Core Competency, create new Competency, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisSop />
    </DashboardLayout>
  );
};

export default AdminDetailKuisSopPage;
