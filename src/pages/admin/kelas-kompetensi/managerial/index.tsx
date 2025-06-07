import DashboardLayout from "@/components/layouts/DashboardLayout";
import Managerial from "@/components/views/Admin/Competency/Managerial";

const AdminManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Managerial Competency"
      description="List of all Managerial Categories, create new Competency, and manage existing Managerial."
      type="admin"
    >
      <Managerial />
    </DashboardLayout>
  );
};

export default AdminManagerialCompetencyPage;
