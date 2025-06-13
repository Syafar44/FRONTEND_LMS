import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailKajian from "./useDetailKajian";
import ImageTab from "./ImageTab";
import VideoTab from "./VideoTab";

const DetailKajian = () => {
  const {
    dataKajian,
    handleUpdateKajian,
    isPendingMutateUpdateKajian,
    isSuccessMutateUpdateKajian,
  } = useDetailKajian();
  return (
    <Tabs aria-label="Options">
      <Tab key="video" title="Video">
        <VideoTab
          currentVideo={dataKajian?.video}
          onUpdate={handleUpdateKajian}
          isPendingUpdate={isPendingMutateUpdateKajian}
          isSuccessUpdate={isSuccessMutateUpdateKajian}
        />
      </Tab>
      <Tab key="image" title="Image">
        <ImageTab
          currentImage={dataKajian?.image}
          onUpdate={handleUpdateKajian}
          isPendingUpdate={isPendingMutateUpdateKajian}
          isSuccessUpdate={isSuccessMutateUpdateKajian}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataKajian={dataKajian}
          onUpdate={handleUpdateKajian}
          isPendingUpdate={isPendingMutateUpdateKajian}
          isSuccessUpdate={isSuccessMutateUpdateKajian}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKajian;
