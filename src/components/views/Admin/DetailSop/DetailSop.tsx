import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailSop from "./useDetailSop";

const DetailSop = () => {
  const {
    dataSop,
    handleUpdateSop,
    isPendingMutateUpdateSop,
    isSuccessMutateUpdateSop,
  } = useDetailSop();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataSop}
          onUpdate={handleUpdateSop}
          isPendingUpdate={isPendingMutateUpdateSop}
          isSuccessUpdate={isSuccessMutateUpdateSop}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailSop;
