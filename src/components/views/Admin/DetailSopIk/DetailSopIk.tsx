import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailSopIk from "./useDetailSopIk";

const DetailSopIk = () => {
  const {
    dataSopIk,
    handleUpdateSopIk,
    isPendingMutateUpdateSopIk,
    isSuccessMutateUpdateSopIk,
  } = useDetailSopIk();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataSopIk}
          onUpdate={handleUpdateSopIk}
          isPendingUpdate={isPendingMutateUpdateSopIk}
          isSuccessUpdate={isSuccessMutateUpdateSopIk}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailSopIk;
