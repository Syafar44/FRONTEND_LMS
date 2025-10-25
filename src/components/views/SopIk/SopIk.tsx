import { Card, CardBody, CardHeader, Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useSopIk from "./useSopIk"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { ISopIk } from "@/types/SopIk"
import Link from "next/link"

const SopIk = () => {
    const {
        dataSopIk,
        isPendingSopIk,
        router,
    } = useSopIk()
    
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
    
    const isPending = isPendingSopIk

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
            <section>
                {!isPending ? (
                    dataSopIk?.data?.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
                            {dataSopIk?.data.map((sopik: ISopIk) => {
                                return (
                                    <Link key={sopik.slug} href={`/sopdanik/kuis/${sopik.slug}`}>
                                        <Card onPress={() => router.push(`/sopdanik/${sopik.slug}`)}>
                                            <CardHeader className="p-0">
                                                <div className="bg-primary w-full h-10" />
                                            </CardHeader>
                                            <CardBody>
                                                <h2 className="text-xl font-bold">
                                                    {sopik.title}
                                                </h2>
                                                <p className="text-sm text-secondary/80 line-clamp-6">
                                                    {sopik.description}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                )
                            })}
                            <div className="flex justify-center md:justify-end">
                                {dataSopIk?.pagination?.totalPages > 1 && (
                                    <Pagination
                                        isCompact
                                        showControls
                                        className="text-black"
                                        color="primary"
                                        page={Number(currentPage)}
                                        total={dataSopIk?.pagination?.totalPages}
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

export default SopIk