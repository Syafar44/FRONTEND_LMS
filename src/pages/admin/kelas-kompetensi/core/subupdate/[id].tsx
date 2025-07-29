import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSubCompetency from "@/components/views/Admin/DetailSubCompetency";

const AdminDetailCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Core Competency"
      description="List of all Detail Core Categories, create new Competency, and manage existing Detail Core."
      type="admin"
    >
      <DetailSubCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailCoreCompetencyPage;
