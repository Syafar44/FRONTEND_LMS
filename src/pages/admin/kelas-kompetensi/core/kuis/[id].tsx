import DashboardLayout from "@/components/layouts/DashboardLayout";
import KuisCompetency from "@/components/views/Admin/KuisCompetency";


const AdminCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Kuis Core Competency"
      description="List of all Kuis Core Competency, create new Kuis Competency, and manage existing Core."
      type="admin"
    >
      <KuisCompetency />
    </DashboardLayout>
  );
};

export default AdminCoreCompetencyPage;
