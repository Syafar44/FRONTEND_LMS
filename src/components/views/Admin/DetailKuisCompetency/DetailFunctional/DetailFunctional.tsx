import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailFunctional from "./useDetailFunctional";

const DetailFunctional = () => {
  const {
    dataFunctional,
    handleUpdateFunctional,
    isPendingMutateUpdateFunctional,
    isSuccessMutateUpdateFunctional,
  } = useDetailFunctional();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataFunctional={dataFunctional}
          onUpdate={handleUpdateFunctional}
          isPendingUpdate={isPendingMutateUpdateFunctional}
          isSuccessUpdate={isSuccessMutateUpdateFunctional}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailFunctional;
