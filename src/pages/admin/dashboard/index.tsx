import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Ini adalah halaman dashboard admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
