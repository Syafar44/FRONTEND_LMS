import { Button, Skeleton } from "@heroui/react";
import useDetailIk from "./useDetailIk";
import PageHead from "@/components/commons/PageHead";
import YouTube from "react-youtube";
import { PiFilePdfLight } from "react-icons/pi";

const DetailIk = () => {
    const {
        dataIk,
        isPendingDataIk,
        handleVideoEnd,
        containerRef,
        isView,
        router
    } = useDetailIk();

    const isPending = isPendingDataIk

    const handleDownload = () => {
        window.open(`${dataIk.file}`, "_blank");
    };

    return (
        <>
            <div className="grid md:grid-cols-2 gap-5">
                <section className="pt-5 grid gap-3">
                    <div
                        ref={containerRef} 
                        className="aspect-video w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow border">
                        {!isPending ? (
                            <YouTube
                                videoId={dataIk?.video}
                                onEnd={handleVideoEnd}
                                opts={{
                                width: "100%",
                                height: "100%",
                                }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Skeleton className="w-full h-[250px] rounded-lg" />
                        )}
                    </div>
                    {isView && (
                        <div className="flex w-full">
                            <Button
                                onPress={() => router.push(`/ik/kuis/${dataIk?.slug}`)}
                                className="bg-accent text-primary w-full shadow-md"
                            >
                                Kerjakan Kuis
                            </Button>
                        </div>
                    )}
                </section>
                {!isPending ? (
                    <section className="grid md:flex flex-col md:py-5 gap-5">
                        <h2 className="text-lg font-bold">{dataIk?.title}</h2>
                        <p className="text-sm">{dataIk?.description}</p>
                        <div className="w-full">
                            <p>Pelajari Juga Materi Berikut: </p>
                            <Button onPress={handleDownload} className="bg-red-700/80 text-white w-full mt-3" startContent={<PiFilePdfLight size={20} />}>
                                Download PDF
                            </Button>
                        </div>
                    </section>
                ) : (
                    <div className="w-full grid gap-2">
                        <Skeleton className="h-7 w-1/3 rounded-md" />
                        <Skeleton className="h-6 w-full rounded-md" />
                    </div>
                )}
            </div>
        </>
    );
};

export default DetailIk;
