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
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataUser: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataUser, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("fullName", `${dataUser?.fullName}`);
    setValueUpdateInfo("email", `${dataUser?.email}`);
    setValueUpdateInfo("access", `${dataUser?.access}`);
    setValueUpdateInfo("job", `${dataUser?.job}`);
  }, [dataUser]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

    const access_list = [
    {
        key: "outlet",
        label: "Outlet",
    },
    {
        key: "gerai",
        label: "Gerai",
    },
    {
        key: "office",
        label: "Office",
    },
    {
        key: "produksi",
        label: "Produksi",
    },
    {
        key: "manager",
        label: "Manager",
    },
    {
        key: "warehouse",
        label: "Warehouse",
    },
    {
        key: "general_affair",
        label: "General affair",
    },
  ]

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this User
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataUser?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataUser?.email}
            className="rounded-lg"
          >
            <Controller
              name="email"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Email"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.email !== undefined}
                  errorMessage={errorsUpdateInfo.email?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataUser?.access}
            className="rounded-lg"
          >
            <Controller
              name="access"
              control={controlUpdateInfo}
              render={({field: {onChange, ...field}}) => (
                  <Select
                      {...field}
                      label="Access"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errorsUpdateInfo.access !== undefined}
                      errorMessage={errorsUpdateInfo.access?.message}
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) => {
                          onChange(`${value.anchorKey}`)
                      }}
                  >
                  {access_list.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                          {item.label}
                      </SelectItem>
                  ))}
                  </Select>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataUser?.email}
            className="rounded-lg"
          >
            <Controller
              name="job"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Job"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.job !== undefined}
                  errorMessage={errorsUpdateInfo.job?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingUpdate || !dataUser?._id}
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
