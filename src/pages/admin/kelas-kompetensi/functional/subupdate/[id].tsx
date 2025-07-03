import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailFunctional from "@/components/views/Admin/DetailSubCompetency/DetailFunctional";


const AdminDetailFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="DetailFunctional Competency"
      description="List of all DetailFunctional Categories, create new Competency, and manage existing DetailFunctional."
      type="admin"
    >
      <DetailFunctional />
    </DashboardLayout>
  );
};

export default AdminDetailFunctionalCompetencyPage;
