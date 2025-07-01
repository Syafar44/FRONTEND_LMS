
import { Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useKajian from "./useKajian"
import { ICompetency } from "@/types/Competency"
import CardCourse from "@/components/ui/CardCourse"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { IKajian } from "@/types/Kajian"
import { IResume } from "@/types/Resume"
import resumeServices from "@/services/resume.service"

const Kajian = () => {
    const {
        dataKajian,
        isPendingKajian,
        isFetchingKajian,
        dataResume,
    } = useKajian()

    const {
        setUrl,
        currentPage,
        handleChangePage,
        handleSearch,

  } = useChangeUrl();

    const { isReady } = useRouter();

    useEffect(() => {
        if (isReady) {
          setUrl();
        }
      }, [isReady]);

    const isPending =  isPendingKajian

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    onChange={handleSearch}
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPending || !isFetchingKajian ? (
                    <div className="grid gap-5 md:grid-cols-3">
                        {dataKajian?.data.map((kajian: IKajian) => {
                            const resume = dataResume ? dataResume?.data.some((item: IResume) => item.kajian === kajian._id) : false
                            return (
                            <CardCourse
                                key={kajian._id}
                                data={kajian}
                                type="kajian"
                                isPass={resume}
                            />)
                        })}
                        <div className="flex justify-center md:justify-end">
                            {dataKajian?.pagination?.totalPages > 1 && (
                                <Pagination
                                    isCompact
                                    showControls
                                    className="text-black"
                                    color="primary"
                                    page={Number(currentPage)}
                                    total={dataKajian?.pagination?.totalPages}
                                    onChange={handleChangePage}
                                    loop
                                />
                            )}
                        </div>
                    </div>
                ): (
                    <Skeleton className="h-[240px] w-full rounded-lg"/>
                )}
            </section>
        </div>
    )
}

export default Kajian