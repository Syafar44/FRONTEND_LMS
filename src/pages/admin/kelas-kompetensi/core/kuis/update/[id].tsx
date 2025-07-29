import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisCompetency from "@/components/views/Admin/DetailKuisCompetency";

const AdminDetailKuisCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Competency"
      description="List of all Detail Core Competency, create new Competency, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailKuisCoreCompetencyPage;
