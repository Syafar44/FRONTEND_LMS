import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailCompetency from "./useDetailCompetency";
import ImageTab from "./ImageTab";

const DetailCompetency = () => {
  const {
    dataCompetency,
    handleUpdateCompetency,
    isPendingMutateUpdateCompetency,
    isSuccessMutateUpdateCompetency,
  } = useDetailCompetency();
  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <ImageTab
          currentImage={dataCompetency?.image}
          onUpdate={handleUpdateCompetency}
          isPendingUpdate={isPendingMutateUpdateCompetency}
          isSuccessUpdate={isSuccessMutateUpdateCompetency}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCompetency={dataCompetency}
          onUpdate={handleUpdateCompetency}
          isPendingUpdate={isPendingMutateUpdateCompetency}
          isSuccessUpdate={isSuccessMutateUpdateCompetency}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCompetency;
