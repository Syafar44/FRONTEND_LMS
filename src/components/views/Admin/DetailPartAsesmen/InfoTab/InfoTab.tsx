import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IPartAsesmen } from "@/types/Asesmen";


interface PropTypes {
  dataPartAsesmen: IPartAsesmen;
  onUpdate: (data: IPartAsesmen) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataPartAsesmen, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataPartAsesmen?.title}`);
    setValueUpdateInfo("type", `${dataPartAsesmen?.type}`);
    setValueUpdateInfo("completed", dataPartAsesmen?.completed ?? false);
  }, [dataPartAsesmen]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Core Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this Core
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataPartAsesmen?.title} className="rounded-lg">
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
          <Skeleton isLoaded={!!dataPartAsesmen?.type} className="rounded-lg">
            <Controller
                name="type"
                control={controlUpdateInfo}
                render={({field: {onChange, ...field}}) => (
                  <Select
                    {...field}
                    label="TYPE Ujian"
                    variant="bordered"
                    isInvalid={errorsUpdateInfo.type !== undefined}
                    errorMessage={errorsUpdateInfo.type?.message}
                    className="mb-2"
                    selectedKeys={
                      field.value ? [field.value.toString()] : []
                    }
                    onSelectionChange={(value) => {
                      onChange(value.anchorKey)
                    }}
                  >
                    <SelectItem key="1">
                      Type 1
                    </SelectItem>
                    <SelectItem key="2">
                      Type 2
                    </SelectItem>
                  </Select>
                )}
              />
          </Skeleton>
          <Skeleton isLoaded={dataPartAsesmen?.completed !== undefined} className="rounded-lg">
            <Controller
              name="completed"
              control={controlUpdateInfo}
              render={({ field: { onChange, value, ...field } }) => (
                <Select
                  {...field}
                  label="Keterangan"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.completed !== undefined}
                  errorMessage={errorsUpdateInfo.completed?.message}
                  className="mb-2"
                  selectedKeys={value !== undefined ? [String(value)] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    onChange(selected === "true");
                  }}
                >
                  <SelectItem key="true">
                    Ujian Selesai
                  </SelectItem>
                  <SelectItem key="false">
                    {dataPartAsesmen?.completed == false ? "Belum Melaksanakan Ujian" : "Ulangi Ujian"}
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingUpdate || !dataPartAsesmen?._id}
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
