import { Button, Skeleton } from "@heroui/react";
import useDetailKajian from "./useDetailKajian";
import PageHead from "@/components/commons/PageHead";
import YouTube from "react-youtube";

const DetailKajian = () => {
    const {
        dataKajian,
        isPendingDataKajian,
        handleVideoEnd,
        containerRef,
        isView,
        router
    } = useDetailKajian();

    const isPending = isPendingDataKajian

    return (
        <>
            <div className="grid gap-5">
                <section className="pt-5 grid gap-3">
                    <div
                        ref={containerRef} 
                        className="aspect-video w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow border">
                        {!isPending ? (
                            <YouTube
                                videoId={dataKajian?.video}
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
                                onPress={() => router.push(`/kajian-online/resume/${dataKajian?._id}`)}
                                className="bg-accent text-primary w-full shadow-md"
                            >
                                ISI RESUME
                            </Button>
                        </div>
                    )}
                </section>
                {!isPending ? (
                <section className="grid gap-5">
                    <h2 className="text-lg font-bold">{dataKajian?.title}</h2>
                    <p className="text-sm">{dataKajian?.description}</p>
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

export default DetailKajian;
