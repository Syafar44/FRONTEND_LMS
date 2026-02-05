import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailPartAsesmen from "./useDetailPartAsesmen";

const PartDetailAsesmen = () => {
  const {
    dataPartAsesmen,
    handleUpdatePartAsesmen,
    isPendingMutateUpdatePartAsesmen,
    isSuccessMutateUpdatePartAsesmen,
  } = useDetailPartAsesmen();
  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataPartAsesmen={dataPartAsesmen}
          onUpdate={handleUpdatePartAsesmen}
          isPendingUpdate={isPendingMutateUpdatePartAsesmen}
          isSuccessUpdate={isSuccessMutateUpdatePartAsesmen}
        />
      </Tab>
    </Tabs>
  );
};

export default PartDetailAsesmen;
