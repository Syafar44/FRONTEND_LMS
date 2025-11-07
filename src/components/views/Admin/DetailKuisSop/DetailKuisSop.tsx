import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisSop from "./useDetailKuisSop";

const DetailKuisSop = () => {
  const {
    dataKuisSop,
    handleUpdateKuisSop,
    isPendingMutateUpdateKuisSop,
    isSuccessMutateUpdateKuisSop,
  } = useDetailKuisSop();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataKuisSop}
          onUpdate={handleUpdateKuisSop}
          isPendingUpdate={isPendingMutateUpdateKuisSop}
          isSuccessUpdate={isSuccessMutateUpdateKuisSop} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisSop;
