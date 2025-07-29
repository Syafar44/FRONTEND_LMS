import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailSubCompetency from "./useDetailSubCompetency";
import VideoTab from "./VideoTab";

const DetailSubCompetency = () => {
  const {
    dataSubCompetency,
    handleUpdateSubCompetency,
    isPendingMutateUpdateSubCompetency,
    isSuccessMutateUpdateSubCompetency,
  } = useDetailSubCompetency();

  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="Video">
        <VideoTab
          currentVideo={dataSubCompetency?.video}
          onUpdate={handleUpdateSubCompetency}
          isPendingUpdate={isPendingMutateUpdateSubCompetency}
          isSuccessUpdate={isSuccessMutateUpdateSubCompetency}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataSubCompetency={dataSubCompetency}
          onUpdate={handleUpdateSubCompetency}
          isPendingUpdate={isPendingMutateUpdateSubCompetency}
          isSuccessUpdate={isSuccessMutateUpdateSubCompetency}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailSubCompetency;
