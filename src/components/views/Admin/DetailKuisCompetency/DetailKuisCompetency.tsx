import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisCompetency from "./useDetailKuisCompetency";

const DetailKuisCompetency = () => {
  const {
    dataKuisCompetency,
    handleUpdateKuisCompetency,
    isPendingMutateUpdateKuisCompetency,
    isSuccessMutateUpdateKuisCompetency,
  } = useDetailKuisCompetency();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataKuisCompetency={dataKuisCompetency}
          onUpdate={handleUpdateKuisCompetency}
          isPendingUpdate={isPendingMutateUpdateKuisCompetency}
          isSuccessUpdate={isSuccessMutateUpdateKuisCompetency} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisCompetency;
