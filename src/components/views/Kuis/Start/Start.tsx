import { Button, Radio, RadioGroup} from "@heroui/react"
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
        router,
        score,

        handleRecap,
        remainingTime,
        formattedTime,

        subCompetency,
    } = useStart()

    return (
        <div className="grid gap-5">
            <section className="grid gap-5">
                <div className="flex justify-between">
                    <div>
                        <h2 className="font-bold">Kompetensi Soal:</h2>
                        <p>{subCompetency?.title}</p>
                    </div>
                    <h1 className={remainingTime <= 60 ? 'text-red-500' : ''}>
                        {formattedTime}
                    </h1>
                </div>
                <div className="border-y p-5 grid grid-cols-5 px-14 gap-y-2">
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
            </section>
            <section className="grid gap-5 border-b pb-5">
                {!isPendingKuis ? (
                    <>
                        <div>
                            <p>{dataKuis?.question}</p>
                        </div>
                        <RadioGroup value={radioSelect} onValueChange={setRadioSelect}>
                            <Radio value="1">{dataKuis?.option1}</Radio>
                            <Radio value="2">{dataKuis?.option2}</Radio>
                            <Radio value="3">{dataKuis?.option3}</Radio>
                            <Radio value="4">{dataKuis?.option4}</Radio>
                        </RadioGroup>
                    </>
                ): (
                    <div className="p-20 flex justify-center">
                        <p>Sedang dimuat..</p>
                    </div>
                )}
            </section>
            <section className="flex justify-end">
                {numberSoal === (jumlahSoal ?? 0) ? (
                    <Button
                        isDisabled={radioSelect === null}
                        className="bg-primary text-black font-bold"
                        onPress={() => {
                            handleSelect(Number(radioSelect), true)
                            handleRecap()
                        }}
                    >
                        Selesiakan Kuis
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
            </section>
        </div>
    )
}

export default Start