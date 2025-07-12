import DashboardLayout from "@/components/layouts/DashboardLayout";
import SubCompetency from "@/components/views/Admin/SubCompetency";


const AdminSubFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Sub Functional Competency"
      description="List of all SubFunctional Categories, create new Competency, and manage existing SubFunctional."
      type="admin"
    >
      <SubCompetency />
    </DashboardLayout>
  );
};

export default AdminSubFunctionalCompetencyPage;
