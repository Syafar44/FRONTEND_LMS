import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useTabRegister from "./useTabRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useFileHandling } from "@/hooks/useFileHandling";

const TabRegister = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useTabRegister();

  const {
    file,
    loading,
    error,
    response,
    handleFileChange,
    uploadFile,
  } = useFileHandling();

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
    <div className="max-w-[600px] grid gap-5">
        <Card>
            <CardBody className="p-8">
                <div className="grid gap-3">
                    <h1 className="text-lg font-bold">Register Massal</h1>
                    <Input type="file" onChange={handleFileChange} />
                    <Button onPress={uploadFile} color="primary" className="text-black" isDisabled={!file} isLoading={loading}>
                        Upload & Register Massal
                    </Button>
                </div>
                {(response || error) && (
                    <div className="p-5 border rounded-lg mt-5">
                        {response && (
                        <div className="text-green-600">
                            {response.message}
                            <ul className="list-disc ml-5">
                            {response.data?.map((user: any) => (
                                <li key={user.email}>{user.email}</li>
                            ))}
                            {response.errors?.length > 0 && (
                                <div className="text-red-600 mt-2">
                                <strong>Error:</strong>
                                <ul>
                                    {response.errors.map((err: string, idx: number) => (
                                    <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                                </div>
                            )}
                            </ul>
                        </div>
                        )}

                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                )}
            </CardBody>
        </Card>
        <Card>
            <CardBody className="p-8">
            <h1 className="pb-5 text-lg font-bold">Register Manual</h1>
            {errors.root && (
                <p className="mb-2 font-medium text-danger">
                    {errors?.root?.message}
                </p>
            )}
            <form
                className={cn(
                "flex w-full flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
                )}
                onSubmit={handleSubmit(handleRegister)}
            >
                <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    type="text"
                    label="Fullname"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.fullName !== undefined}
                    errorMessage={errors.fullName?.message}
                    />
                )}
                />
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
                name="access"
                control={control}
                render={({field: {onChange, ...field}}) => (
                    <Select
                    {...field}
                    label="Access"
                    variant="bordered"
                    isInvalid={errors.access !== undefined}
                    errorMessage={errors.access?.message}
                    className="mb-2"
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
                <Controller
                name="job"
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    type="job"
                    label="Job"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.job !== undefined}
                    errorMessage={errors.job?.message}
                    />
                )}
                />
                <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    type={visiblePassword.password ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    endContent={
                        <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("password")}
                        >
                        {visiblePassword.password ? (
                            <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                            <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                        </button>
                    }
                    />
                )}
                />
                <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <Input
                    {...field}
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    label="Password Confirmation"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                    endContent={
                        <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("confirmPassword")}
                        >
                        {visiblePassword.confirmPassword ? (
                            <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                            <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                        </button>
                    }
                    />
                )}
                />

                <Button color="primary" className="text-black disabled:bg-gray-700" disabled={isPendingRegister} size="lg" type="submit">
                {isPendingRegister ? (
                    <Spinner color="primary" size="sm" />
                ) : (
                    "Register"
                )}
                </Button>
            </form>
            </CardBody>
        </Card>
    </div>
  );
};

export default TabRegister;
