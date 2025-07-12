import DashboardLayout from "@/components/layouts/DashboardLayout";
import Competency from "@/components/views/Admin/Competency";

const AdminManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Managerial Competency"
      description="List of all Managerial Categories, create new Competency, and manage existing Managerial."
      type="admin"
    >
      <Competency />
    </DashboardLayout>
  );
};

export default AdminManagerialCompetencyPage;
