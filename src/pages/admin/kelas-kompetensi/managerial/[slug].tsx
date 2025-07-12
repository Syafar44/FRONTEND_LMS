import DashboardLayout from "@/components/layouts/DashboardLayout";
import SubCompetency from "@/components/views/Admin/SubCompetency";

const AdminSubManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Sub Managerial Competency"
      description="List of all SubManagerial Categories, create new Competency, and manage existing SubManagerial."
      type="admin"
    >
      <SubCompetency />
    </DashboardLayout>
  );
};

export default AdminSubManagerialCompetencyPage;
