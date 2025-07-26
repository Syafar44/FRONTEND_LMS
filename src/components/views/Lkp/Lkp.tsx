import { useEffect } from "react";
import useLkp from "./useLkp";
import { Button, Card, CardBody, Input, Radio, RadioGroup, Skeleton, Spinner } from "@heroui/react";
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
    setValueAddLkp,

    dataLkpSunnah,
    isPendingAddLkpSunnah,
    handleAbsenSunnah,
    controlAddLkpSunnah,
    errorsAddLkpSunnah,
    handleSubmitAddLkpSunnah,
    isSuccessAddLkpSunnah,
    refetchLkpSunnah,
    resetAddLkpSunnah,
    setValueAddLkpSunnah,
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

  const Dhuha = [
    {
      value: "2 Rakaat",
    },
    {
      value: "4 Rakaat",
    },
    {
      value: "8 Rakaat",
    },
  ]
  
  const al_quran = [
    {
      value: "1 Halaman",
    },
    {
      value: "2 Halaman",
    },
    {
      value: "Lebih dari 2 Halaman",
    },
  ]  

  useEffect(() => {
    setValueAddLkp("subuh", `${dataLkp?.subuh}`)
    setValueAddLkp("dzuhur", `${dataLkp?.dzuhur}`)
    setValueAddLkp("ashar", `${dataLkp?.ashar}`)
    setValueAddLkp("magrib", `${dataLkp?.magrib}`)
    setValueAddLkp("isya", `${dataLkp?.isya}`)
    setValueAddLkpSunnah("dhuha", `${dataLkpSunnah?.dhuha}`)
    setValueAddLkpSunnah("al_quran", `${dataLkpSunnah?.al_quran}`)
    setValueAddLkpSunnah("rawatib", Number(dataLkpSunnah?.rawatib ?? 0))
  }, [dataLkp])

  useEffect(() => {
    if(isSuccessAddLkp || isSuccessAddLkpSunnah) {
      resetAddLkp()
      refetchLkp()
      resetAddLkpSunnah()
      refetchLkpSunnah()
    }
  }, [isSuccessAddLkp, isSuccessAddLkpSunnah])

  return (
    <section className="max-w-[600px]">
      {!isPendingLkp ? (
        <div className="grid gap-5">
          <h2 className="text-lg font-bold">IBADAH WAJIB</h2>
          <form onSubmit={handleSubmitAddLkp(handleAbsen)} className="grid gap-5 border-b pb-5">
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkp.subuh && 'bg-red-500/20'}`}>
              <h2 className="font-bold text-center text-sm">SHOLAT SUBUH</h2>
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
                          <p className="text-sm">
                            {item.value}
                          </p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkp.dzuhur && 'bg-red-500/20'}`}>
                <h2 className="font-bold text-center text-sm">SHOLAT DZUHUR</h2>
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
                          <p className="text-sm">
                            {item.value}
                          </p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkp.ashar && 'bg-red-500/20'}`}>
                <h2 className="font-bold text-center text-sm">SHOLAT ASHAR</h2>
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
                          <p className="text-sm">
                            {item.value}
                          </p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkp.magrib && 'bg-red-500/20'}`}>
                <h2 className="font-bold text-center text-sm">SHOLAT MAGRIB</h2>
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
                          <p className="text-sm">
                            {item.value}
                          </p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkp.isya && 'bg-red-500/20'}`}>
              <h2 className="font-bold text-center text-sm">SHOLAT ISYA</h2>
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
          <h2 className="text-lg font-bold">IBADAH SUNNAH</h2>
          <form onSubmit={handleSubmitAddLkpSunnah(handleAbsenSunnah)} className="grid gap-5">
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkpSunnah.dhuha && 'bg-red-500/20'}`}>
              <h2 className="font-bold text-center text-sm">SHOLAT DHUHA</h2>
                <Controller 
                  name="dhuha"
                  control={controlAddLkpSunnah}
                  render={({field}) => (
                    <RadioGroup 
                      {...field}
                      isInvalid={errorsAddLkpSunnah.dhuha !== undefined}
                      errorMessage={errorsAddLkpSunnah.dhuha?.message}
                    >
                      {Dhuha.map((item: { value: string }, idx: number) => (
                        <Radio key={idx} value={item.value}>
                          <p>
                            {item.value}
                          </p>
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkpSunnah.rawatib && 'bg-red-500/20'}`}>
                <h2 className="font-bold text-center text-sm">SHOLAT RAWATIB</h2>
                <Controller 
                  name="rawatib"
                  control={controlAddLkpSunnah}
                  render={({field}) => (
                    <div className="flex items-center justify-between gap-3 border rounded-xl p-3 shadow-sm">
                      <span className="text-center font-semibold text-lg">
                        {field.value || 0} Rakaat
                      </span>
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          isIconOnly
                          onPress={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                          className="px-3 py-1 bg-primary rounded-full text-lg"
                          isDisabled={(field.value ?? 0) == 0}
                        >
                          −
                        </Button>
                        <Button
                          type="button"
                          isIconOnly
                          onPress={() => field.onChange((field.value || 0) + 1)}
                          className="px-3 py-1 bg-primary rounded-full text-lg"
                          isDisabled={(field.value ?? 0) == 12}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody className={`bg-white shadow-lg p-5 rounded-xl grid gap-3 ${errorsAddLkpSunnah.al_quran && 'bg-red-500/20'}`}>
                <h2 className="font-bold text-center text-sm">MEMBACA AL-QUR&apos;AN</h2>
                <Controller 
                  name="al_quran"
                  control={controlAddLkpSunnah}
                  render={({field}) => (
                    <RadioGroup 
                      {...field} 
                      isInvalid={errorsAddLkpSunnah.al_quran !== undefined}
                      errorMessage={errorsAddLkpSunnah.al_quran?.message}
                    >
                      {al_quran.map((item: { value: string }, idx: number) => (
                        <Radio key={idx} value={item.value}>
                          <p>
                            {item.value}
                          </p>
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
              {isPendingAddLkpSunnah ? <Spinner size='sm' /> : "Kirim"}
            </Button>
          </form>
        </div>
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
