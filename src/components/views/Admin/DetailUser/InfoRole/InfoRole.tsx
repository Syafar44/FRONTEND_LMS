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
import useInfoRole from "./useInfoRole";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataUser: IProfile;
  refetchUser: () => void;
}

const InfoRole = (props: PropTypes) => {
  const { dataUser, refetchUser } = props;
  const {
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
    handleUpdateUser,
    isPendingMutateUpdate,
    isSuccessMutateUpdate,
  } = useInfoRole(refetchUser);

  useEffect(() => {
    setValue("role", `${dataUser?.role}`);
  }, [dataUser]);

  const access_list = [
    {
        key: "admin",
        label: "Admin",
    },
    {
        key: "user",
        label: "User",
    },
  ]

  useEffect(() => {
    if (isSuccessMutateUpdate) {
      reset();
    }
  }, [isSuccessMutateUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Role</h1>
        <p className="w-full text-small text-default-400">
          Manage Role of this User
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Skeleton
            isLoaded={!!dataUser?.access}
            className="rounded-lg"
          >
            <Controller
              name="role"
              control={control}
              render={({field: {onChange, ...field}}) => (
                  <Select
                      {...field}
                      label="Role"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errors.role !== undefined}
                      errorMessage={errors.role?.message}
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) => {
                          onChange(`${value.anchorKey}`)
                      }}
                  >
                  {access_list.map((item) => (
                      <SelectItem key={String(item.key)}>
                          {item.label}
                      </SelectItem>
                  ))}
                  </Select>
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingMutateUpdate || !dataUser?._id}
          >
            {isPendingMutateUpdate ? (
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

export default InfoRole;
