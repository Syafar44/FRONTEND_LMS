import CardCourse from "@/components/ui/CardCourse"
import { Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useCompetency from "./useCompetency"
import { ICompetency } from "@/types/Competency"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const Competency = () => {
    const {
        dataCourse,
        isPendingCourse,  
        dataSave,
        dataSubCompetency,
        pathSegments,
        dataUser,
        isPendingUser,
        dataCompleted,
    } = useCompetency()
    
    const {
        setUrl,
        currentPage,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useChangeUrl();
    
    const { isReady } = useRouter();
    
    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);
    
    const isPending = isPendingCourse || isPendingUser 
    const lastData = dataCompleted?.reduce((latest: {createdAt: string}, current: {createdAt: string}) => {
        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
    }, dataCompleted?.[0]);

    const lastTime = lastData?.createdAt;
    const [isWaitOver, setIsWaitOver] = useState(false);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!lastTime) return;
        const waitUntil = dayjs(lastTime).add(15, 'minute');
        const now = dayjs();
        if (now.isAfter(waitUntil)) {
            setIsWaitOver(false);
            setCountdown("00:00");
            return;
        }
        setIsWaitOver(true);
        const interval = setInterval(() => {
            const now = dayjs();
            const diff = waitUntil.diff(now);
            if (diff <= 0) {
                setIsWaitOver(false);
                setCountdown("");
                clearInterval(interval);
            } else {
                const minutes = Math.floor(diff / 1000 / 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setCountdown(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastTime]);

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    onChange={handleSearch}
                    onClear={handleClearSearch}
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            {isWaitOver && (
                <section>
                        <div className="flex justify-between items-center border p-3 rounded-lg bg-red-500/20 border-red-500">
                            <h2 className="text-sm">
                                Mohon Menunggu Untuk Berpindah Materi
                            </h2>
                            <p className="font-bold">
                                {countdown}
                            </p>
                        </div>
                </section>
            )}
            <section>
                {!isPending ? (
                    dataCourse?.data?.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
                            {dataCourse?.data.map((course: ICompetency) => {
                                const isProgress = dataSave?.competency === course?._id;
                                const progress = (dataSave?.progress ?? 0) / (dataSubCompetency?.length ?? 1) * 100;
                                const lock = dataSave ? (isProgress ? false : true) : false
                                const accessUser = dataUser?.access;
                                const accessCourse = course?.access || [];
                                const access = accessCourse.includes(accessUser); 
                                const isAccess = dataSave ? false : access
                                const allAccess = course?.access?.includes('all-team')
                                const isCompeted = dataCompleted?.some((item: {competency: string}) => item.competency === course._id)
                                return (
                                    <CardCourse
                                        key={course._id}
                                        data={course}
                                        competency={`${pathSegments[2]}`}
                                        progress={
                                            !isCompeted ? (
                                                isProgress ? progress : 0
                                            ) : 100 
                                        }
                                        isLock={lock}
                                        isAccess={allAccess ? true : isAccess}
                                        isCompleted={isCompeted}
                                        isCountdown={isWaitOver}
                                    />
                                )
                            })}
                            <div className="flex justify-center md:justify-end">
                                {dataCourse?.pagination?.totalPages > 1 && (
                                    <Pagination
                                        isCompact
                                        showControls
                                        className="text-black"
                                        color="primary"
                                        page={Number(currentPage)}
                                        total={dataCourse?.pagination?.totalPages}
                                        onChange={handleChangePage}
                                        loop
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center px-10 border py-20 rounded-lg"> 
                            <h2 className="text-lg font-bold">Belum ada kompetensi yang di Tambahkan.</h2>
                        </div>
                    )
                ): (
                    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">
                        <Skeleton className="h-[240px] md:h-[340px] rounded-lg" />
                        <Skeleton className="h-[240px] md:h-[340px] rounded-lg" />
                    </div>
                )}
            </section>
        </div>
    )
}

export default Competency