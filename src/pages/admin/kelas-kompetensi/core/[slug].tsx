import DashboardLayout from "@/components/layouts/DashboardLayout";
import Core from "@/components/views/Admin/SubCompetency/Core";


const AdminSubCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="SubCore Competency"
      description="List of all SubCore Categories, create new Competency, and manage existing SubCore."
      type="admin"
    >
      <Core />
    </DashboardLayout>
  );
};

export default AdminSubCoreCompetencyPage;
