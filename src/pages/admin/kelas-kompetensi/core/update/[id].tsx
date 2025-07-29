import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCompetency from "@/components/views/Admin/DetailCompetency";

const AdminDetailCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Sub Core Competency"
      description="List of all DetailCore Categories, create new Competency, and manage existing DetailCore."
      type="admin"
    >
      <DetailCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailCoreCompetencyPage;
