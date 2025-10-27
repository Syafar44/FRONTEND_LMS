import { Tab, Tabs } from "@heroui/react";

import TabKuis from "./TabKuis";
import TabResume from "./TabResume";
import useAktivitas from "./useAktivitas";
import TabScore from "./TabScore";

const Aktivitas = () => {

  const { handleTabChange } = useAktivitas();

  return (
    <Tabs aria-label="Options" onSelectionChange={handleTabChange}>
      <Tab key="resume" title="Resume Kajian">
        <TabResume /> 
      </Tab>
      <Tab key="kuis" title="Recap Competency">
        <TabKuis />
      </Tab>
      <Tab key="sopik" title="Recap Sop & IK">
        <TabScore />
      </Tab>
    </Tabs>
  );
};

export default Aktivitas;
