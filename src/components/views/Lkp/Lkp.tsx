import { useEffect } from "react";
import useLkp from "./useLkp";
import { Button, Card, CardBody, Radio, RadioGroup, Skeleton, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";

const LkpAbsensi = () => {
  const {
    dataLkp,
    isPendingLkp,
    isPendingAddLkp,
    handleAbsen,

    controlAddLkp,
    errorsAddLkp,
    handleSubmitAddLkp,
    isSuccessAddLkp,
    refetchLkp,
    resetAddLkp,
    setValueAddLkp
  } = useLkp()


  const Sholat = [
    {
      value: "Dikerjakan secara berjamaah",
    },
    {
      value: "Dikerjakan namun tidak berjamaah",
    },
    {
      value: "Tidak mengerjakan",
    },
  ]

  console.log(dataLkp?.ashar)

  useEffect(() => {
    setValueAddLkp("subuh", `${dataLkp?.subuh}`)
    setValueAddLkp("dzuhur", `${dataLkp?.dzuhur}`)
    setValueAddLkp("ashar", `${dataLkp?.ashar}`)
    setValueAddLkp("magrib", `${dataLkp?.magrib}`)
    setValueAddLkp("isya", `${dataLkp?.isya}`)
  }, [dataLkp])

  useEffect(() => {
    if(isSuccessAddLkp) {
      resetAddLkp()
      refetchLkp()
    }
  }, [isSuccessAddLkp])

  return (
    <section className="max-w-[600px]">
      {!isPendingLkp ? (
        <form onSubmit={handleSubmitAddLkp(handleAbsen)} className="grid gap-5">
          <Card>
            <CardBody className={`bg-white shadow-lg p-5 rounded-xl text-center grid gap-3 ${errorsAddLkp.subuh && 'bg-red-500/20'}`}>
            <h2 className="font-bold">SHOLAT SUBUH</h2>
              <Controller 
                name="subuh"
                control={controlAddLkp}
                render={({field}) => (
                  <RadioGroup 
                    {...field}
                    isInvalid={errorsAddLkp.subuh !== undefined}
                    errorMessage={errorsAddLkp.subuh?.message}
                  >
                    {Sholat.map((item: { value: string }, idx: number) => (
                      <Radio key={idx} value={item.value}>
                        {item.value}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody className={`bg-white shadow-lg p-5 rounded-xl text-center grid gap-3 ${errorsAddLkp.dzuhur && 'bg-red-500/20'}`}>
              <h2 className="font-bold">SHOLAT DZUHUR</h2>
              <Controller 
                name="dzuhur"
                control={controlAddLkp}
                render={({field}) => (
                  <RadioGroup 
                    {...field} 
                    isInvalid={errorsAddLkp.dzuhur !== undefined}
                    errorMessage={errorsAddLkp.dzuhur?.message}
                  >
                    {Sholat.map((item: { value: string }, idx: number) => (
                      <Radio key={idx} value={item.value}>
                        {item.value}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody className={`bg-white shadow-lg p-5 rounded-xl text-center grid gap-3 ${errorsAddLkp.ashar && 'bg-red-500/20'}`}>
              <h2 className="font-bold">SHOLAT ASHAR</h2>
              <Controller 
                name="ashar"
                control={controlAddLkp}
                render={({field}) => (
                  <RadioGroup 
                    {...field}
                    isInvalid={errorsAddLkp.ashar !== undefined}
                    errorMessage={errorsAddLkp.ashar?.message}
                  >
                    {Sholat.map((item: { value: string }, idx: number) => (
                      <Radio key={idx} value={item.value}>
                        {item.value}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody className={`bg-white shadow-lg p-5 rounded-xl text-center grid gap-3 ${errorsAddLkp.magrib && 'bg-red-500/20'}`}>
              <h2 className="font-bold">SHOLAT MAGRIB</h2>
              <Controller 
                name="magrib"
                control={controlAddLkp}
                render={({field}) => (
                  <RadioGroup 
                    {...field}
                    isInvalid={errorsAddLkp.magrib !== undefined}
                    errorMessage={errorsAddLkp.magrib?.message}
                  >
                    {Sholat.map((item: { value: string }, idx: number) => (
                      <Radio key={idx} value={item.value}>
                        {item.value}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody className={`bg-white shadow-lg p-5 rounded-xl text-center grid gap-3 ${errorsAddLkp.isya && 'bg-red-500/20'}`}>
            <h2 className="font-bold">SHOLAT ISYA</h2>
              <Controller 
                name="isya"
                control={controlAddLkp}
                render={({field}) => (
                  <RadioGroup 
                    {...field}
                    isInvalid={errorsAddLkp.isya !== undefined}
                    errorMessage={errorsAddLkp.isya?.message}
                  >
                    {Sholat.map((item: { value: string }, idx: number) => (
                      <Radio key={idx} value={item.value}>
                        {item.value}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </CardBody>
          </Card>
          <Button 
            type="submit" 
            className="bg-primary font-bold text-md disabled:bg-gray-900"
            isDisabled={isPendingAddLkp}
          >
            {isPendingAddLkp ? <Spinner size='sm' /> : "Kirim"}
          </Button>
        </form>
      ) : (
        <div className="grid gap-5 max-w-[600px]">
          <Skeleton className="w-full h-[160px] rounded-md" />
          <Skeleton className="w-full h-[160px] rounded-md" />
        </div>
      )}
    </section>
  );
};

export default LkpAbsensi;
