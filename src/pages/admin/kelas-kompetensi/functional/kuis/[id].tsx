import DashboardLayout from "@/components/layouts/DashboardLayout";
import Core from "@/components/views/Admin/KuisCompetency/Core";
import Functional from "@/components/views/Admin/KuisCompetency/Functional";

const AdminCoreCompetencyPage = () => {
  return (
    <DashboardLayout
      title="Core Competency"
      description="List of all Core Categories, create new Competency, and manage existing Core."
      type="admin"
    >
      <Functional />
    </DashboardLayout>
  );
};

export default AdminCoreCompetencyPage;
