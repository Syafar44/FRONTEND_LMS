import DashboardLayout from "@/components/layouts/DashboardLayout";
import Managerial from "@/components/views/Admin/SubCompetency/Managerial";

const AdminSubManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="SubManagerial Competency"
      description="List of all SubManagerial Categories, create new Competency, and manage existing SubManagerial."
      type="admin"
    >
      <Managerial />
    </DashboardLayout>
  );
};

export default AdminSubManagerialCompetencyPage;
