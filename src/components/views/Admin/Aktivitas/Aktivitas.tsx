import { Tab, Tabs } from "@heroui/react";
import TabKuis from "./TabKuis";
import TabResume from "./TabResume";
import useAktivitas from "./useAktivitas";
import TabScore from "./TabScore";
import TabScoreSop from "./TabScoreSop";
import TabScoreIk from "./TabScoreIk";
import TabScoreKajian from "./TabScoreKajian";

const Aktivitas = () => {

  const { handleTabChange } = useAktivitas();

  return (
    <Tabs aria-label="Options" onSelectionChange={handleTabChange}>
      <Tab key="kajian" title="Recap Kajian">
        <TabScoreKajian /> 
      </Tab>
      {/* <Tab key="resume" title="Resume Kajian">
        <TabResume /> 
      </Tab> */}
      <Tab key="kuis" title="Recap Competency">
        <TabKuis />
      </Tab>
      {/* <Tab key="sopik" title="Recap Sop & Ik">
        <TabScore />
      </Tab> */}
      <Tab key="sop" title="Recap Sop">
        <TabScoreSop />
      </Tab>
      <Tab key="ik" title="Recap Ik">
        <TabScoreIk />
      </Tab>
    </Tabs>
  );
};

export default Aktivitas;

