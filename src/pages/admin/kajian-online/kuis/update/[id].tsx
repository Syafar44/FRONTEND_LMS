import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisKajian from "@/components/views/Admin/DetailKuisKajian";

const AdminDetailKuisKajianPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Kajian"
      description="List of all Detail Core Kajian, create new Kajian, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisKajian />
    </DashboardLayout>
  );
};

export default AdminDetailKuisKajianPage;
