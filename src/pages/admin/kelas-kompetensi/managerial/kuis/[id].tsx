import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisCompetency from "@/components/views/Admin/KuisCompetency";

const AdminManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Kuis Managerial Competency"
      description="List of all Kuis Managerial Competency, create new Kuis Competency, and manage existing Managerial."
      type="admin"
    >
      <KuisCompetency />
    </DashboardLayout>
  );
};

export default  AdminManagerialCompetencyPage;
