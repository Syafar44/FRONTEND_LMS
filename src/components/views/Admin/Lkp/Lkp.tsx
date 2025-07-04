import { Tab, Tabs } from "@heroui/react";

import TabRekap from "./TabRekap";

const Lkp = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="rekap-lkp" title="Rekap Lembar Kepatuhan Pribadi">
        <TabRekap />
      </Tab>
    </Tabs>
  );
};

export default Lkp;
