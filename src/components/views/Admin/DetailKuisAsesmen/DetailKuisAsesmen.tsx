import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisAsesmen from "./useDetailKuisAsesmen";

const DetailKuisAsesmen = () => {
  const {
    dataKuisAsesmen,
    handleUpdateKuisAsesmen,
    isPendingMutateUpdateKuisAsesmen,
    isSuccessMutateUpdateKuisAsesmen,
  } = useDetailKuisAsesmen();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataKuisAsesmen}
          onUpdate={handleUpdateKuisAsesmen}
          isPendingUpdate={isPendingMutateUpdateKuisAsesmen}
          isSuccessUpdate={isSuccessMutateUpdateKuisAsesmen} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisAsesmen;
