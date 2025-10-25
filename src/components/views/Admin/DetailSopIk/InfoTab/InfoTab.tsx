import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ISopIk } from "@/types/SopIk";

interface PropTypes {
  data: ISopIk;
  onUpdate: (data: ISopIk) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { data, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${data?.title}`);
    setValueUpdateInfo("description", `${data?.description}`);
  }, [data]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">SOP & IK Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this SOP & IK
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!data?.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Sub Judul"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingUpdate || !data?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
