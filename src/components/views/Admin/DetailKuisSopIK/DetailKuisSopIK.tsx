import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKuisSopIK from "./useDetailKuisSopIK";

const DetailKuisSopIk = () => {
  const {
    dataKuisSopIk,
    handleUpdateKuisSopIk,
    isPendingMutateUpdateKuisSopIk,
    isSuccessMutateUpdateKuisSopIk,
  } = useDetailKuisSopIK();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          data={dataKuisSopIk}
          onUpdate={handleUpdateKuisSopIk}
          isPendingUpdate={isPendingMutateUpdateKuisSopIk}
          isSuccessUpdate={isSuccessMutateUpdateKuisSopIk} 
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKuisSopIk;
