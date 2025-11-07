import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisIk from "@/components/views/Admin/DetailKuisIk";

const AdminDetailKuisIkPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Competency"
      description="List of all Detail Core Competency, create new Competency, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisIk />
    </DashboardLayout>
  );
};

export default AdminDetailKuisIkPage;
