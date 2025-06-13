import DashboardLayout from "@/components/layouts/DashboardLayout";
import Kajian from "@/components/views/Admin/Kajian";

const AdminKajianPage = () => {
  return (
    <DashboardLayout
      title="Kajian Online"
      description="List of all Kajian Categories, create new Competency, and manage existing Kajian."
      type="admin"
    >
      <Kajian />
    </DashboardLayout>
  );
};

export default AdminKajianPage;
