import { Tab, Tabs } from "@heroui/react";

import TabKuis from "./TabKuis";
import TabRekap from "./TabRekap";
import TabResume from "./TabResume";

const Aktivitas = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="resume" title="Resume Kajian">
        <TabResume />
      </Tab>
      <Tab key="kuis" title="Kuis Competency">
        <TabKuis />
      </Tab>
      <Tab key="rekap" title="Rekap Nilai">
        <TabRekap />
      </Tab>
    </Tabs>
  );
};

export default Aktivitas;
