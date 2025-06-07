import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailCore from "./useDetailCore";
import ImageTab from "./ImageTab";

const DetailCore = () => {
  const {
    dataCore,
    handleUpdateCore,
    isPendingMutateUpdateCore,
    isSuccessMutateUpdateCore,
  } = useDetailCore();
  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <ImageTab
          currentImage={dataCore?.image}
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
