import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailCore from "./useDetailCore";
import VideoTab from "./VideoTab";

const DetailCore = () => {
  const {
    dataCore,
    handleUpdateCore,
    isPendingMutateUpdateCore,
    isSuccessMutateUpdateCore,
  } = useDetailCore();

  console.log("dataCore", dataCore);

  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="Video">
        <VideoTab
          currentVideo={dataCore?.video}
          onUpdate={handleUpdateCore}
          isPendingUpdate={isPendingMutateUpdateCore}
          isSuccessUpdate={isSuccessMutateUpdateCore}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCore={dataCore}
          onUpdate={handleUpdateCore}
          isPendingUpdate={isPendingMutateUpdateCore}
          isSuccessUpdate={isSuccessMutateUpdateCore}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCore;
