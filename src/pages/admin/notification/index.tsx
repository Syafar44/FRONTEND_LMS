import DashboardLayout from "@/components/layouts/DashboardLayout";
import Notification from "@/components/views/Admin/Notification";

const AdminNotificationPage = () => {
  return (
    <DashboardLayout
      title="Notifikasi LMS Panglima"
      description="Ini adalah halaman untuk mengirim notifikasi kepada pengguna"
      type="admin"
    >
      <Notification />
    </DashboardLayout>
  );
};

export default AdminNotificationPage;
