import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailManagerial from "./useDetailManagerial";
import VideoTab from "./VideoTab";

const DetailManagerial = () => {
  const {
    dataManagerial,
    handleUpdateManagerial,
    isPendingMutateUpdateManagerial,
    isSuccessMutateUpdateManagerial,
  } = useDetailManagerial();

  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="video">
        <VideoTab
          currentVideo={dataManagerial?.video}
          onUpdate={handleUpdateManagerial}
          isPendingUpdate={isPendingMutateUpdateManagerial}
          isSuccessUpdate={isSuccessMutateUpdateManagerial}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataManagerial={dataManagerial}
          onUpdate={handleUpdateManagerial}
          isPendingUpdate={isPendingMutateUpdateManagerial}
          isSuccessUpdate={isSuccessMutateUpdateManagerial}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailManagerial;
