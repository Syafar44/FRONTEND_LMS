import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisIk from "./useDetailKuisIk";

const DetailKuisIk = () => {
  const {
    dataKuisIk,
    handleUpdateKuisIk,
    isPendingMutateUpdateKuisIk,
    isSuccessMutateUpdateKuisIk,
  } = useDetailKuisIk();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataKuisIk}
          onUpdate={handleUpdateKuisIk}
          isPendingUpdate={isPendingMutateUpdateKuisIk}
          isSuccessUpdate={isSuccessMutateUpdateKuisIk} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisIk;
