import { Button, Card, CardBody, Skeleton } from "@heroui/react"
import useDetailCompetency from "./useDetailCompetency"
import { FaCheck, FaCirclePlay} from "react-icons/fa6"
import { ISubCompetency } from "@/types/Competency"
import PageHead from "@/components/commons/PageHead"
import ReactPlayer from 'react-player/lazy'

const DetailCompetency = () => {

    const {
        competency,
        subCompetencyById,
        isPendingSubCompetencyById,
        isPendingCompetency,

        setSubCompetency,

        dataCompetency,
        isPendingDataCompetency,
    } = useDetailCompetency()

    const subCompetency = subCompetencyById

    return (
        <>
        <header className="-mt-16 mb-10">
            <PageHead title={subCompetency?.title} />
            <img src="/images/general/logo.png" alt="logo panglima" className="w-[100px] rounded-md" />
        </header>
        <div className="grid gap-5">
            <section className="pt-5 grid gap-3">
                {!isPendingSubCompetencyById ? (
                    <iframe 
                        className="w-full h-[250px] rounded-lg"
                        src={subCompetency?.video}
                        allowFullScreen
                    />
                ) : (
                    <Skeleton className="w-full h-[250px] rounded-lg" />
                )}
                <div className="flex justify-between">
                    <Button className="bg-primary text-gray-700" isDisabled={isPendingCompetency && isPendingSubCompetencyById}>Play Video</Button>
                    <Button className="text-primary bg-gray-700" isDisabled={isPendingCompetency && isPendingSubCompetencyById}>Kerjakan Kuis</Button>
                </div>
            </section>
            {!isPendingSubCompetencyById ? (
                <section>
                    <h2 className="text-lg font-bold">
                        {subCompetency?.title}
                    </h2>
                    <p className="text-sm">
                        {subCompetency?.description}
                    </p>
                </section>
            ): (
                <div className="w-full grid gap-2">
                    <Skeleton className="h-7 w-1/3 rounded-md" />
                    <Skeleton className="h-6 w-full rounded-md" />
                </div>
            )}
            <section>
                {!isPendingCompetency && !isPendingSubCompetencyById ? (
                    <Card>
                        <CardBody  className="p-3 grid gap-2">
                            {competency.map((item: ISubCompetency) => (
                                <Button 
                                    key={item._id}
                                    onPress={() => {setSubCompetency(`${item._id}`)}}
                                    className="w-full flex items-center justify-between gap-5 px-5 py-7 bg-primary rounded-lg">
                                    <div className="flex gap-5 items-center">
                                        <FaCirclePlay size={25} />
                                        <p>{item.title}</p>
                                    </div>
                                    <FaCheck size={20}/>
                                </Button>
                            ))}
                        </CardBody>
                    </Card>
                ) : (
                    <Skeleton className="w-full h-[200px] rounded-xl" />
                )}
            </section>
        </div>
        </>
    )
}

export default DetailCompetency