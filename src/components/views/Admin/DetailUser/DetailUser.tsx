import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailUser from "./useDetailUser";
import PasswordTab from "./PasswordTab";


const DetailUser = () => {
  const {
    dataUser,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
  } = useDetailUser();
  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataUser={dataUser}
          onUpdate={handleUpdateUser}
          isPendingUpdate={isPendingMutateUpdateUser}
          isSuccessUpdate={isSuccessMutateUpdateUser}
        />
      </Tab>
      <Tab key="setPassword" title="Set Password">
        <PasswordTab />
      </Tab>
    </Tabs>
  );
};

export default DetailUser;
