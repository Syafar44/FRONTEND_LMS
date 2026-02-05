import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailAsesmen from "./useDetailAsesmen";

const DetailAsesmen = () => {
  const {
    dataAsesmen,
    handleUpdateAsesmen,
    isPendingMutateUpdateAsesmen,
    isSuccessMutateUpdateAsesmen,
  } = useDetailAsesmen();
  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataAsesmen={dataAsesmen}
          onUpdate={handleUpdateAsesmen}
          isPendingUpdate={isPendingMutateUpdateAsesmen}
          isSuccessUpdate={isSuccessMutateUpdateAsesmen}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailAsesmen;
