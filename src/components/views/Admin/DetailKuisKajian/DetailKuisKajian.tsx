import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisKajian from "./useDetailKuisKajian";

const DetailKuisKajian = () => {
  const {
    dataKuisKajian,
    handleUpdateKuisKajian,
    isPendingMutateUpdateKuisKajian,
    isSuccessMutateUpdateKuisKajian,
  } = useDetailKuisKajian();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataKuisKajian}
          onUpdate={handleUpdateKuisKajian}
          isPendingUpdate={isPendingMutateUpdateKuisKajian}
          isSuccessUpdate={isSuccessMutateUpdateKuisKajian} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisKajian;
