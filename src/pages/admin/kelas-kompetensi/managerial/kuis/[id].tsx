import DashboardLayout from "@/components/layouts/DashboardLayout";
import Managerial from "@/components/views/Admin/KuisCompetency/Managerial/Managerial";

const AdminCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Core Competency"
      description="List of all Core Categories, create new Competency, and manage existing Core."
      type="admin"
    >
      <Managerial />
    </DashboardLayout>
  );
};

export default AdminCoreCompetencyPage;
