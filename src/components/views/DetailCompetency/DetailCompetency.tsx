import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import useDetailCompetency from "./useDetailCompetency";
import { FaCheck, FaCirclePlay, FaLock } from "react-icons/fa6";
import { ISubCompetency } from "@/types/Competency";
import PageHead from "@/components/commons/PageHead";
import YouTubeWithControls from "@/components/ui/YouTubeWithControls";
import { IScore } from "@/types/Score";
import { useMemo } from "react";

const DetailCompetency = () => {
  const {
    competency,
    subCompetencyById,
    isPendingSubCompetencyById,
    isPendingCompetency,

    historyKuis,
    isPendingHistoryKuis,

    subCompetency,
    setSubCompetency,

    isView,
    setIsView,
    
    dataVideo,
    isPendingVideo,
  } = useDetailCompetency();

    const dataSub = subCompetencyById;
    const isPending =
    isPendingSubCompetencyById || isPendingCompetency || isPendingHistoryKuis || isPendingVideo

    return (
        <>
        <header className="-mt-16 mb-10">
            <PageHead title={dataSub?.title} />
            <img
            src="/images/general/logo.png"
            alt="logo panglima"
            className="w-[100px] rounded-md"
            />
        </header>
        <div className="grid gap-5">
            <section className="pt-5 grid gap-3">
            {!isPending ? (
                <YouTubeWithControls
                    selectionId={dataSub?._id}
                    videoId={dataSub?.video}
                    isView={dataVideo?.viewed}
                    subCompetency={dataSub?._id}
                    isPending={isPending}
                />
            ) : (
                <Skeleton className="w-full h-[250px] rounded-lg" />
            )}
            </section>
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
            <section>
            {!isPending ? (
                <Card>
                <CardBody className="p-3 grid gap-2">
                    {competency.map((item: ISubCompetency, index: number) => {
                    const isActive = item._id === dataSub?._id;
                    const isUnlock = item._id === historyKuis?.bySubCompetency;

                    const lastUnlockIndex = competency.findIndex(
                        (c: IScore) => c._id === historyKuis?.bySubCompetency
                    );

                    const isNextAfterUnlock = index === lastUnlockIndex + 1;

                    let isClickable = isActive || isUnlock;
                    let showWaitMessage = false;
                    let remainingTimeText = "";

                    if (isNextAfterUnlock && historyKuis?.createdAt) {
                        const passedAt = new Date(historyKuis.createdAt).getTime();
                        const now = new Date().getTime();
                        const remainingMs = passedAt + 15 * 60 * 1000 - now;

                        if (!isUnlock) {
                        const timeLeft = remainingMs;
                        const timeToUse = timeLeft > 0 ? timeLeft : 0;
                        if (timeToUse > 0) {
                            showWaitMessage = true;
                            const minutes = String(Math.floor(timeToUse / 1000 / 60)).padStart(2, "0");
                            const seconds = String(Math.floor((timeToUse / 1000) % 60)).padStart(2, "0");
                            remainingTimeText = `${minutes}:${seconds}`;
                        } else {
                            isClickable = true;
                        }
                        }
                    }

                    return (
                    <div key={item._id} className="grid gap-1">
                        {showWaitMessage && (
                        <p className="text-xs text-red-500 ml-2 text-center">
                            Kamu bisa lanjut setelah: {remainingTimeText}
                        </p>
                        )}
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
                        <div className="flex gap-5 items-center">
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
