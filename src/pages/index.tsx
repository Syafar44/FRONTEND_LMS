import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "@/components/views/Home";

const HomePage = () => {
  return (
    <DashboardLayout type="user" title="Dashabord">
      <Home />
    </DashboardLayout>
  );
};

export default HomePage;
