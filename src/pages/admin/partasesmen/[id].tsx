import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailPartAsesmen from "@/components/views/Admin/DetailPartAsesmen";

const AdminDetailPartAsesmenPage = () => {
  return (
    <DashboardLayout
      title="Detail Part Asesmen"
      description="List of all Detail Part Asesmen Categories, create new Asesmen, and manage existing Detail Part Asesmen."
      type="admin"
    >
      <DetailPartAsesmen />
    </DashboardLayout>
  );
};

export default AdminDetailPartAsesmenPage;
