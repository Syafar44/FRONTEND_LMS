import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import useDetailCompetency from "./useDetailCompetency";
import { FaCheck, FaCirclePlay, FaLock } from "react-icons/fa6";
import { ISubCompetency } from "@/types/Competency";
import YouTubeWithControls from "@/components/ui/YouTubeWithControls";
import { IScore } from "@/types/Score";

const DetailCompetency = () => {
  const {
    competency,
    subCompetencyById,
    isPendingSubCompetencyById,
    isPendingCompetency,
    historyKuis,
    isPendingHistoryKuis,
    setSubCompetency,
    isView,
    isPendingVideo,
  } = useDetailCompetency();

    const dataSub = subCompetencyById;
    const isPending =
    isPendingSubCompetencyById || isPendingCompetency || isPendingHistoryKuis || isPendingVideo

    return (
        <>
            <div className="flex flex-col gap-5 xl:flex-row items-start">
                <section className="grid gap-3 w-full">
                    {!isPending ? (
                        <YouTubeWithControls
                            selectionId={dataSub?._id}
                            videoId={dataSub?.video}
                            isView={isView}
                            subCompetency={dataSub?._id}
                            isPending={isPending}
                        />
                    ) : (
                        <Skeleton className="w-full h-[250px] rounded-lg" />
                    )}
                </section>
                <section className="grid gap-5 w-full xl:max-w-[300px] 2xl:max-w-[600px] h-auto">
                    {!isPending ? (
                        <section>
                            <h2 className="text-lg font-bold">{dataSub?.title}</h2>
                            <p className="text-sm">{dataSub?.description}</p>
                        </section>
                    ) : (
                        <div className="w-full grid gap-2">
                            <Skeleton className="h-7 w-1/3 rounded-md" />
                            <Skeleton className="h-6 w-full rounded-md" />
                        </div>
                    )}
                    {!isPending ? (
                        <Card className="w-full border">
                            <CardBody className="p-3 grid gap-2">
                                {competency.map((item: ISubCompetency, index: number) => {
                                const isActive = item._id === dataSub?._id;
                                const isUnlock = historyKuis?.some((h: IScore) => h.bySubCompetency === item._id);

                                const lastUnlock = historyKuis?.[historyKuis.length - 1]?.bySubCompetency;
                                const lastUnlockIndex = competency.findIndex((c: IScore) => c._id === lastUnlock);

                                const isNextAfterUnlock = index === lastUnlockIndex + 1;

                                let isClickable = isActive || isUnlock || isNextAfterUnlock;

                                return (
                                <div key={item._id} className="grid gap-1">
                                    <Button
                                        onPress={() => {
                                            if (isClickable) setSubCompetency(`${item._id}`);
                                        }}
                                        disabled={!isClickable}
                                        className={`w-full flex items-center justify-between gap-5 px-5 py-7
                                            ${isActive ? "bg-primary text-black" : "bg-white"}
                                            ${!isClickable ? "opacity-50 cursor-not-allowed" : ""}
                                            rounded-lg`}
                                        >
                                        <div className="flex gap-5 items-center text-wrap text-start">
                                            <FaCirclePlay size={25} />
                                            <p>{item.title}</p>
                                        </div>
                                        {isUnlock && <FaCheck size={20} />}
                                        {!isClickable && <FaLock size={20} />}
                                    </Button>
                                </div>
                                );
                                })}
                            </CardBody>
                        </Card>
                    ) : (
                        <Skeleton className="w-full h-[200px] rounded-xl" />
                    )}
                </section>
            </div>
        </>
    );
};

export default DetailCompetency;
