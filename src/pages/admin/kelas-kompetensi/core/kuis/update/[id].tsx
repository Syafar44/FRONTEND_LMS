import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCore from "@/components/views/Admin/DetailKuisCompetency/DetailCore";



const AdminDetailKuisCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Competency"
      description="List of all DetailCore Categories, create new Competency, and manage existing DetailCore."
      type="admin"
    >
      <DetailCore />
    </DashboardLayout>
  );
};

export default AdminDetailKuisCoreCompetencyPage;
