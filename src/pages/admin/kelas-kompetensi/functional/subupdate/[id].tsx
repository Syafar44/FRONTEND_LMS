import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSubCompetency from "@/components/views/Admin/DetailSubCompetency";

const AdminDetailFunctionalCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Detail Functional Competency"
      description="List of all Detail Functional Categories, create new Competency, and manage existing Detail Functional."
      type="admin"
    >
      <DetailSubCompetency />
    </DashboardLayout>
  );
};

export default AdminDetailFunctionalCompetencyPage;
