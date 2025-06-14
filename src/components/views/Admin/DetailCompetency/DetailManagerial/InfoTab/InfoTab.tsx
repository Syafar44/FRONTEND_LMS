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
import { ICompetency } from "@/types/Competency";

interface PropTypes {
  dataManagerial: ICompetency;
  onUpdate: (data: ICompetency) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataManagerial, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataManagerial?.title}`);
    setValueUpdateInfo("description", `${dataManagerial?.description}`);
    setValueUpdateInfo("access", Array.isArray(dataManagerial?.access) ? dataManagerial?.access : [`${dataManagerial?.access}`]);
  }, [dataManagerial]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

    const list_access = [
    {
      key: "all-team",
      value: "All Team",
    },
    {
      key: "outlet",
      value: "Outlet",
    },
    {
      key: "gerai",
      value: "Gerai",
    },
    {
      key: "produksi",
      value: "Produksi",
    },
    {
      key: "office",
      value: "Office",
    },
    {
      key: "manager",
      value: "Manager",
    },
  ]

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Managerial Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this Managerial
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataManagerial?.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
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
            isLoaded={!!dataManagerial?.description}
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
          <Skeleton
            isLoaded={!!dataManagerial?.access}
            className="rounded-lg"
          >
            <Controller
              name="access"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CheckboxGroup
                  {...field}
                  color="warning"
                  label="Select Access"
                  value={Array.isArray(field.value) ? field.value.filter((item): item is string => item !== undefined) : []}
                  onValueChange={(value) => {
                    setValueUpdateInfo("access", value);
                  }}
                  isInvalid={errorsUpdateInfo.access !== undefined}
                  errorMessage={errorsUpdateInfo.access?.message}
                  orientation="horizontal"
                >
                  {list_access.map((item) => (
                    <Checkbox 
                      key={item.key} 
                      value={item.key}
                    >
                      {item.value}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingUpdate || !dataManagerial?._id}
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
