import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";

import { Controller } from "react-hook-form";
import usePasswordTab from "./usePasswordTab";
import { useEffect } from "react";

const PasswordTab = () => {
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
    handleUpdateUser,
    resetUpdateInfo,
  } = usePasswordTab();

  useEffect(() => {
    if(isSuccessMutateUpdateUser) {
      resetUpdateInfo();
    }
  } , [isSuccessMutateUpdateUser]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Set Password</h1>
        <p className="w-full text-small text-default-400">
          Manage Password of this User
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(handleUpdateUser)}
        >
            <Controller
              name="newPassword"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="New Password"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.newPassword !== undefined}
                  errorMessage={errorsUpdateInfo.newPassword?.message}
                  className="mb-2"
                />
              )}
            />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500 text-black"
            type="submit"
            disabled={isPendingMutateUpdateUser}
          >
            {isPendingMutateUpdateUser ? (
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

export default PasswordTab;
