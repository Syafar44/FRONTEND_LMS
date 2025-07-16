import { Tab, Tabs } from "@heroui/react";
import TabKeamanan from "./TabKeamanan";
import TabProfile from "./TabProfile/TabProfile";

const Setting = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="Profile" title="Profile">
        <TabProfile />
      </Tab>
      <Tab key="Keamanan" title="Keamanan">
        <TabKeamanan />
      </Tab>
    </Tabs>
  );
};

export default Setting;
