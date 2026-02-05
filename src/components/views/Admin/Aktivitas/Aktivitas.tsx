import { Tab, Tabs } from "@heroui/react";
import TabKuis from "./TabKuis";
import useAktivitas from "./useAktivitas";
import TabScoreSop from "./TabScoreSop";
import TabScoreIk from "./TabScoreIk";
import TabScoreKajian from "./TabScoreKajian";
import TabAsesmen from "./TabAsesmen";
import TabScore from "./TabScore";

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
      <Tab key="sopik" title="Recap POST TEST MINGGUAN">
        <TabScore />
      </Tab>
      <Tab key="sop" title="Recap Sop">
        <TabScoreSop />
      </Tab>
      <Tab key="ik" title="Recap Ik">
        <TabScoreIk />
      </Tab>
      {/* <Tab key="asesmen" title="Recap Asesmen">
        <TabAsesmen />
      </Tab> */}
    </Tabs>
  );
};

export default Aktivitas;

