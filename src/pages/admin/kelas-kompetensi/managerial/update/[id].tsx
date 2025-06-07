import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailManagerial from "@/components/views/Admin/DetailCompetency/DetailManagerial";

const AdminDetailManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="DetailManagerial Competency"
      description="List of all DetailManagerial Categories, create new Competency, and manage existing DetailManagerial."
      type="admin"
    >
      <DetailManagerial />
    </DashboardLayout>
  );
};

export default AdminDetailManagerialCompetencyPage;