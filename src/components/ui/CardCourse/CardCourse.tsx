import { IKajian } from "@/types/Kajian"
import { CardBody, Card, Progress, Link } from "@heroui/react"
import Image from "next/image"

interface PropTypes {
    type?: string
    data: IKajian
    competency?: string
}

const CardCourse = (props: PropTypes) => {
  const { 
    type = "course",
    data,
    competency
   } = props

  return (
    <Card>
        <CardBody className="p-3">
            <Link href={`/kelas-kompetensi/${competency}/${data._id}`} className="grid gap-3">
                <Image src={`${data?.image}`} alt={data?.title || "Course Image"} className="w-full h-auto rounded-lg" width={1000} height={1000} />
                <div>
                    <h4 className="text-lg font-bold text-black">
                        {data?.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                        {type === "course" ? "Functional Competency" : data?.description}
                    </p>
                </div>
                {type === "course" && (
                    <Progress
                        classNames={{
                            base: "max-w-md mb-2",
                            track: "drop-shadow-md",
                            indicator: "bg-primary",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                        label="Progress"
                        radius="sm"
                        showValueLabel={true}
                        size="sm"
                        value={65}
                    />
                )}
                {type === "kajian" && (
                    <div className="flex justify-end">
                        <p className="text-sm text-danger">Belum Selesai</p>
                    </div>
                )}
            </Link>
        </CardBody>
    </Card>
  )
}

export default CardCourse