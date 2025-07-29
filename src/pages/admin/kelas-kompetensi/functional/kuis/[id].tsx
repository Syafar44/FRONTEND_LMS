import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisCompetency from "@/components/views/Admin/KuisCompetency";


const AdminFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Kuis Functional Competency"
      description="List of all Kuis Functional Competency, create new Kuis Competency, and manage existing Functional."
      type="admin"
    >
      <KuisCompetency />
    </DashboardLayout>
  );
};

export default AdminFunctionalCompetencyPage;
