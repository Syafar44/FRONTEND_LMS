import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailFunctional from "@/components/views/Admin/DetailKuisCompetency/DetailFunctional";

const AdminDetailKuisFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Functional Competency"
      description="List of all DetailFunctional Categories, create new Competency, and manage existing DetailFunctional."
      type="admin"
    >
      <DetailFunctional />
    </DashboardLayout>
  );
};

export default AdminDetailKuisFunctionalCompetencyPage;
