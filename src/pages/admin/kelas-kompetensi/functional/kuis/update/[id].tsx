import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisCompetency from "@/components/views/Admin/DetailKuisCompetency";

const AdminDetailKuisFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Functional Competency"
      description="List of all Detail Functional Competency, create new Competency, and manage existing Detail Functional."
      type="admin"
    >
      <DetailKuisCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailKuisFunctionalCompetencyPage;
