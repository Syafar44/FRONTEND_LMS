import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "@/components/views/Home";

const HomePage = () => {
  return (
    <DashboardLayout type="user" title="LMS Panglima">
      <Home />
    </DashboardLayout>
  );
};

export default HomePage;
