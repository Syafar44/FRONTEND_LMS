import DashboardLayout from "@/components/layouts/DashboardLayout";
import Functional from "@/components/views/Admin/Competency/Functional";

const AdminFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Functional Competency"
      description="List of all Functional Categories, create new Competency, and manage existing Functional."
      type="admin"
    >
      <Functional />
    </DashboardLayout>
  );
};

export default AdminFunctionalCompetencyPage;
