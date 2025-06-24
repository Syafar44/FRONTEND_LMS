import { Tab, Tabs } from "@heroui/react";
import TabResume from "./TabResume/TabResume";
import TabKuis from "./TabKuis";


const Aktivitas = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="resume" title="Resume Kajian">
        <TabResume />
      </Tab>
      <Tab key="kuis" title="Kuis Competency">
        <TabKuis />
      </Tab>
      <Tab key="Penilaian" title="Penilaian">
        <h1>Penilaian Tab</h1>
      </Tab>
    </Tabs>
  );
};

export default Aktivitas;
