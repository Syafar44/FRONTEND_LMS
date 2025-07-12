import DashboardLayout from "@/components/layouts/DashboardLayout";
import Competency from "@/components/views/Admin/Competency";

const AdminFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Functional Competency"
      description="List of all Functional Categories, create new Competency, and manage existing Functional."
      type="admin"
    >
      <Competency />
    </DashboardLayout>
  );
};

export default AdminFunctionalCompetencyPage;
