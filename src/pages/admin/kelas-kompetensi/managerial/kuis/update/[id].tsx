import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailManagerial from "@/components/views/Admin/DetailKuisCompetency/DetailManagerial";

const AdminDetailKuisManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Managerial Competency"
      description="List of all DetailManagerial Categories, create new Competency, and manage existing DetailManagerial."
      type="admin"
    >
      <DetailManagerial />
    </DashboardLayout>
  );
};

export default AdminDetailKuisManagerialCompetencyPage;
