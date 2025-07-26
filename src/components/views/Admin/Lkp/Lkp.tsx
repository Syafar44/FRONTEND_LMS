import { Tab, Tabs } from "@heroui/react";

import TabRekap from "./TabRekap";
import TabRekapSunnah from "./TabRekapSunnah";

const Lkp = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="rekap-wajib" title="Ibadah Wajib">
        <TabRekap />
      </Tab>
      <Tab key="rekap-sunnah" title="Ibadah Sunnah">
        <TabRekapSunnah />
      </Tab>
    </Tabs>
  );
};

export default Lkp;
