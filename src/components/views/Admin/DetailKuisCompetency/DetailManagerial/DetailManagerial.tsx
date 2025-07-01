import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailManagerial from "./useDetailManagerial";

const DetailManagerial = () => {
  const {
    dataManagerial,
    handleUpdateManagerial,
    isPendingMutateUpdateManagerial,
    isSuccessMutateUpdateManagerial,
  } = useDetailManagerial();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataManagerial={dataManagerial}
          onUpdate={handleUpdateManagerial}
          isPendingUpdate={isPendingMutateUpdateManagerial}
          isSuccessUpdate={isSuccessMutateUpdateManagerial}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailManagerial;
