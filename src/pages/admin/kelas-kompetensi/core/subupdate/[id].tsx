import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCore from "@/components/views/Admin/DetailSubCompetency/DetailCore";


const AdminDetailCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="DetailCore Competency"
      description="List of all DetailCore Categories, create new Competency, and manage existing DetailCore."
      type="admin"
    >
      <DetailCore />
    </DashboardLayout>
  );
};

export default AdminDetailCoreCompetencyPage;
