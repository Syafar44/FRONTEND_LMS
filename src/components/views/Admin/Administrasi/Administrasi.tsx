import { Tab, Tabs } from "@heroui/react";
import TabRegister from "./TabRegister";
import TabUser from "./TabUser";

const Administrasi = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="Register User" title="Register User">
        <TabRegister />
      </Tab>
      <Tab key="Daftar User" title="Daftar User">
        <TabUser/>
      </Tab>
    </Tabs>
  );
};

export default Administrasi;
