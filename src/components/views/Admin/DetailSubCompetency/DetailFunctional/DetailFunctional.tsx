import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailFunctional from "./useDetailFunctional";
import VideoTab from "./VideoTab";

const DetailFunctional = () => {
  const {
    dataFunctional,
    handleUpdateFunctional,
    isPendingMutateUpdateFunctional,
    isSuccessMutateUpdateFunctional,
  } = useDetailFunctional();

  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="video">
        <VideoTab
          currentVideo={dataFunctional?.video}
          onUpdate={handleUpdateFunctional}
          isPendingUpdate={isPendingMutateUpdateFunctional}
          isSuccessUpdate={isSuccessMutateUpdateFunctional}
        />
      </Tab>
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
