import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailAsesmen from "@/components/views/Admin/DetailAsesmen";

const AdminDetailAsesmenPage = () => {
  return (
    <DashboardLayout
      title="Detail Asesmen"
      description="List of all Detail Asesmen Categories, create new Asesmen, and manage existing Detail Asesmen."
      type="admin"
    >
      <DetailAsesmen />
    </DashboardLayout>
  );
};

export default AdminDetailAsesmenPage;
