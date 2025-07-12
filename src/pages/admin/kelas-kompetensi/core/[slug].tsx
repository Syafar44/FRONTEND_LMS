import DashboardLayout from "@/components/layouts/DashboardLayout";
import SubCompetency from "@/components/views/Admin/SubCompetency";


const AdminSubCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Sub Core Competency"
      description="List of all SubCore Categories, create new Competency, and manage existing SubCore."
      type="admin"
    >
      <SubCompetency />
    </DashboardLayout>
  );
};

export default AdminSubCoreCompetencyPage;
