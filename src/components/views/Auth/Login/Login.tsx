import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "next/image";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  return (
    <div className="flex flex-col items-center justify-center gap-10 lg:gap-20">
      <div className="flex flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="https://raw.githubusercontent.com/Syafar44/assets/refs/heads/main/assets/image/Desain%20Kitalulus%20PRG%20(2).jpg"
          alt="logo"
          width={180}
          height={180}
          className="rounded-lg"
        />
      </div>
      <Card>
        <CardBody className="p-5">
          <h2 className="text-2xl font-bold text-primary mb-2">Login LMS Panglima</h2>
          {errors.root && (
            <p className="mb-2 font-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex min-w-[320px] lg:w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Button color="primary" className="text-black disabled:bg-gray-700" size="lg" type="submit" disabled={isPendingLogin}>
              {isPendingLogin ? <Spinner size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
