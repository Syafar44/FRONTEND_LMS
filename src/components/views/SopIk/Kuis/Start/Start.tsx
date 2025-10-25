import { Button, Radio, RadioGroup, Spinner} from "@heroui/react"
import useStart from "./useStart"

const Start = () => {
    const {
        id,
        dataKuis,
        isPendingKuis,
        numberSoal,
        radioSelect,
        setRadioSelect,
        handleSelect,
        jumlahSoal,
        handleRecap,
        remainingTime,
        formattedTime,

        subCompetency,
        isLoading,
        isPendingSubCompetency,
    } = useStart()

    return (
        <div className="grid gap-5">
            <div className="flex justify-between md:border-b md:py-5">
                <div>
                    <h2 className="font-bold md:text-xl">Kompetensi Soal: </h2>
                    <p className="md:text-xl">{subCompetency?.title}</p>
                </div>
                <h1 className={`md:pr-10 md:text-2xl ${remainingTime <= 60 ? 'text-red-500' : ''}`}>
                    {formattedTime}
                </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 md:p-5">
                <div className="grid gap-5 md:border-r">
                    <div className="border-y p-5 grid grid-cols-5 gap-y-2 gap-x-5 md:border-none h-[130px] overflow-y-scroll md:h-auto md:overflow-auto">
                        {Array.from({ length: jumlahSoal ?? 0 }, (_, index) => {
                            const isActive = index < numberSoal - 1;
                            return (
                                <Button
                                    key={index}
                                    variant="bordered"
                                    isIconOnly
                                    className={`p-5 text-xl transition-colors duration-200 ${
                                    isActive ? 'border-green-500 text-green-500' : ''
                                    }`}
                                >
                                    {index + 1}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <section className="grid gap-5 md:w-[800px]">    
                    <div className="border-b pb-5">
                        {!isPendingKuis ? (
                            <div className="flex flex-col items-start gap-5">
                                <div>
                                    <p>{dataKuis?.question}</p>
                                </div>
                                <RadioGroup value={radioSelect} onValueChange={setRadioSelect}>
                                    <Radio value="1">{dataKuis?.option1}</Radio>
                                    <Radio value="2">{dataKuis?.option2}</Radio>
                                    <Radio value="3">{dataKuis?.option3}</Radio>
                                    <Radio value="4">{dataKuis?.option4}</Radio>
                                </RadioGroup>
                            </div>
                        ): (
                            <div className="p-20 flex justify-center">
                                <p>Sedang dimuat..</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        {numberSoal === (jumlahSoal ?? 0) ? (
                            <Button
                                isDisabled={radioSelect === null || isPendingSubCompetency}
                                className="bg-primary text-black font-bold disabled:bg-gray-800"
                                disabled={isLoading}
                                onPress={() => {
                                    handleSelect(Number(radioSelect), true)
                                    handleRecap()
                                }}
                            >
                                {isLoading ? <Spinner size="sm" color="primary"/> : 'Selesiakan Kuis'}
                            </Button>
                        ): (
                            <Button 
                                isDisabled={radioSelect === null}
                                onPress={() => handleSelect(Number(radioSelect), false)}
                                className="bg-accent text-primary px-10 font-bold"
                            >
                                Lanjut
                            </Button>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Start