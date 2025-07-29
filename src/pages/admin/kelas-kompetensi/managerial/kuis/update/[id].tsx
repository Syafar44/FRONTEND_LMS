import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisCompetency from "@/components/views/Admin/DetailKuisCompetency";

const AdminDetailKuisManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Managerial Competency"
      description="List of all Detail Managerial Competency, create new Competency, and manage existing Detail Managerial."
      type="admin"
    >
      <DetailKuisCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailKuisManagerialCompetencyPage;
