import DashboardLayout from "@/components/layouts/DashboardLayout";
import Functional from "@/components/views/Admin/SubCompetency/Functional";


const AdminSubFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Sub Functional Competency"
      description="List of all SubFunctional Categories, create new Competency, and manage existing SubFunctional."
      type="admin"
    >
      <Functional />
    </DashboardLayout>
  );
};

export default AdminSubFunctionalCompetencyPage;
