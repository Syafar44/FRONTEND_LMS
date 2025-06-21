
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
        dataResume,
        isPendingResume,
    } = useKajian()

    const {
        setUrl,
        currentPage,
        handleChangePage,
  } = useChangeUrl();

    const { isReady } = useRouter();

    useEffect(() => {
        if (isReady) {
          setUrl();
        }
      }, [isReady]);

    const isPending =  isPendingKajian || isPendingResume

    console.log("dataResume", dataResume?.data)

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPending ? (
                    <div className="grid gap-5 md:grid-cols-3">
                        {dataKajian?.data.map((kajian: IKajian) => {
                            const resume = dataResume?.data.some((item: IResume) => item.kajian === kajian._id)
                            console.log("resume", resume)
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
                    <Skeleton />
                )}
            </section>
        </div>
    )
}

export default Kajian