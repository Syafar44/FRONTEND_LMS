import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisAsesmen from "@/components/views/Admin/DetailKuisAsesmen";

const AdminDetailKuisAsesmenPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Asesmen"
      description="List of all Detail Core Asesmen, create new Asesmen, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisAsesmen />
    </DashboardLayout>
  );
};

export default AdminDetailKuisAsesmenPage;
