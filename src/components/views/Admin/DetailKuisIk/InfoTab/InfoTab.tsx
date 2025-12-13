import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IKuisIk } from "@/types/Ik";

interface PropTypes {
  data: IKuisIk;
  onUpdate: (data: IKuisIk) => void;
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
    setValueUpdateInfo("question", `${data?.question}`);
    setValueUpdateInfo("option1", `${data?.option1}`);
    setValueUpdateInfo("option2", `${data?.option2}`);
    setValueUpdateInfo("option3", `${data?.option3}`);
    setValueUpdateInfo("option4", `${data?.option4}`);
    setValueUpdateInfo("optionValid", `${data?.optionValid}`);
  }, [data]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Detail Kuis</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this Kuis
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo((data) => {
            onUpdate({
              ...data,
              ...data,
              optionValid: Number(data.optionValid),
            });
          })}
        >
          <Skeleton isLoaded={!!data?.question} className="rounded-lg">
            <Controller
                name="question"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Textarea
                  {...field}
                  label="Question . . ."
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.question !== undefined}
                  errorMessage={errorsUpdateInfo.question?.message}
                  />
                )}
              />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.option1}
            className="rounded-lg"
          >
            <Controller
                name="option1"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 1"
                    variant="bordered"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.option1 !== undefined}
                    errorMessage={errorsUpdateInfo.option1?.message}
                  />
                )}
              />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.option2}
            className="rounded-lg"
          >
            <Controller
                name="option2"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 2"
                    variant="bordered"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.option2 !== undefined}
                    errorMessage={errorsUpdateInfo.option2?.message}
                  />
                )}
              />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.option3}
            className="rounded-lg"
          >
            <Controller
                name="option3"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 3"
                    variant="bordered"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.option3 !== undefined}
                    errorMessage={errorsUpdateInfo.option3?.message}
                  />
                )}
              />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.option4}
            className="rounded-lg"
          >
            <Controller
                name="option4"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 4"
                    variant="bordered"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.option4 !== undefined}
                    errorMessage={errorsUpdateInfo.option4?.message}
                  />
                )}
              />
          </Skeleton>
          <Skeleton
            isLoaded={!!data?.optionValid}
            className="rounded-lg"
            >
              <Controller
                name="optionValid"
                control={controlUpdateInfo}
                render={({field: {onChange, ...field}}) => (
                  <Select
                    {...field}
                    selectedKeys={
                      field.value ? [field.value.toString()] : []
                    }
                    label="Valid Option"
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.optionValid !== undefined}
                    errorMessage={errorsUpdateInfo.optionValid?.message}
                    onSelectionChange={(value) => {
                      onChange(value.anchorKey)
                    }}
                  >
                    <SelectItem key="1">
                      1
                    </SelectItem>
                    <SelectItem key="2">
                      2
                    </SelectItem>
                    <SelectItem key="3">
                      3
                    </SelectItem>
                    <SelectItem key="4">
                      4
                    </SelectItem>
                  </Select>
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
