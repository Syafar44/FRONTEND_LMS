import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSubCompetency from "@/components/views/Admin/DetailSubCompetency";

const AdminDetailManagerialCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Managerial Competency"
      description="List of all Detail Managerial Categories, create new Competency, and manage existing Detail Managerial."
      type="admin"
    >
      <DetailSubCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailManagerialCompetencyPage;
