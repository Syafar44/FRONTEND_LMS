import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKajian from "@/components/views/Admin/DetailKajian";
import Core from "@/components/views/Admin/SubCompetency/Core";


const AdminDetailKajianPage = () => {
  return (
    <DashboardLayout
      title="Detail Kajian Competency"
      description="List of all Detail Kajian Categories, create new Competency, and manage existing Detail Kajian."
      type="admin"
    >
      <DetailKajian />
    </DashboardLayout>
  );
};

export default AdminDetailKajianPage;
