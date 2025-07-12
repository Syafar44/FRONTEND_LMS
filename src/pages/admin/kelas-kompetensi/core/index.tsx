import DashboardLayout from "@/components/layouts/DashboardLayout";
import Competency from "@/components/views/Admin/Competency";

const AdminCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Core Competency"
      description="List of all Core Categories, create new Competency, and manage existing Core."
      type="admin"
    >
      <Competency />
    </DashboardLayout>
  );
};

export default AdminCoreCompetencyPage;
