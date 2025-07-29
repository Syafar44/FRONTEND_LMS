import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCompetency from "@/components/views/Admin/DetailCompetency";

const AdminDetailManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="DetailManagerial Competency"
      description="List of all DetailManagerial Categories, create new Competency, and manage existing DetailManagerial."
      type="admin"
    >
      <DetailCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailManagerialCompetencyPage;