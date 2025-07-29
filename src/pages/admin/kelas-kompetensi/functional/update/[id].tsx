import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCompetency from "@/components/views/Admin/DetailCompetency";

const AdminDetailFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="DetailFunctional Competency"
      description="List of all DetailFunctional Categories, create new Competency, and manage existing DetailFunctional."
      type="admin"
    >
      <DetailCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailFunctionalCompetencyPage;
