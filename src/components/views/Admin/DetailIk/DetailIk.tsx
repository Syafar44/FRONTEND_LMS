import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailIk from "./useDetailIk";
import ImageTab from "./ImageTab";
import VideoTab from "./VideoTab";

const DetailIk = () => {
  const {
    dataIk,
    handleUpdateIk,
    isPendingMutateUpdateIk,
    isSuccessMutateUpdateIk,
  } = useDetailIk();
  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="Video">
        <VideoTab
          currentVideo={dataIk?.video}
          onUpdate={handleUpdateIk}
          isPendingUpdate={isPendingMutateUpdateIk}
          isSuccessUpdate={isSuccessMutateUpdateIk}
        />
      </Tab>
      <Tab key="image" title="Image">
        <ImageTab
          currentImage={dataIk?.image}
          onUpdate={handleUpdateIk}
          isPendingUpdate={isPendingMutateUpdateIk}
          isSuccessUpdate={isSuccessMutateUpdateIk}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          data={dataIk}
          onUpdate={handleUpdateIk}
          isPendingUpdate={isPendingMutateUpdateIk}
          isSuccessUpdate={isSuccessMutateUpdateIk}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailIk;
