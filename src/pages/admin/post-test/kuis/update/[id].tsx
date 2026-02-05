import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKuisSopIK from "@/components/views/Admin/DetailKuisSopIK";

const AdminDetailKuisSopIKPage = () => {
  return (
    <DashboardLayout
      title="Detail Kuis Core Competency"
      description="List of all Detail Core Competency, create new Competency, and manage existing Detail Core."
      type="admin"
    >
      <DetailKuisSopIK />
    </DashboardLayout>
  );
};

export default AdminDetailKuisSopIKPage;
