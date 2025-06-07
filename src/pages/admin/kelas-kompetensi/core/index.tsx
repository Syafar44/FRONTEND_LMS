import DashboardLayout from "@/components/layouts/DashboardLayout";
import Core from "@/components/views/Admin/Competency/Core";

const AdminCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Core Competency"
      description="List of all Core Categories, create new Competency, and manage existing Core."
      type="admin"
    >
      <Core />
    </DashboardLayout>
  );
};

export default AdminCoreCompetencyPage;
