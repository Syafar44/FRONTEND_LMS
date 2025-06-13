import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ISubCompetency } from "@/types/Competency";
import useVideoTab from "./useVideoTab";
import DriveVideoEmbed from "@/utils/DriveVideoEmbed";

interface PropTypes {
  currentVideo: string;
  onUpdate: (data: ISubCompetency) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const VideoTab = (props: PropTypes) => {
  const { currentVideo, onUpdate, isPendingUpdate, isSuccessUpdate} = props;
  const {
    controlUpdateVideo,
    errorsUpdateVideo,
    handleSubmitUpdateVideo,
    resetUpdateVideo,
  } = useVideoTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateVideo();
    }
  }, [isSuccessUpdate]);
  
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Functional Video</h1>
        <p className="w-full text-small text-default-400">
          Manage Video of this sub competency. You can update the video link
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateVideo(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Video</p>
            <Skeleton
              isLoaded={!!currentVideo}
              className="rounded-lg"
            >
              <iframe
                src={`${currentVideo}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-2xl shadow-md border border-gray-200 w-full h-80"
              ></iframe>
            </Skeleton>
          </div>
          <Controller
            name="video"
            control={controlUpdateVideo}
            render={({ field: { onChange, value, ...field } }) => (
              <Input 
                {...field}
                value={value}
                onChange={(e) => {
                  const url = e.target.value;
                  const driveId = url.match(/(?:drive\.google\.com\/.*?\/d\/)([^\/?]+)/);
                  if (driveId) {
                    onChange(`https://drive.google.com/file/d/${driveId[1]}/preview`);
                  } else {
                    onChange(url);
                  }
                }}
                placeholder="Input link video"
                className="w-full"
                errorMessage={errorsUpdateVideo?.video?.message}
                isInvalid={!!errorsUpdateVideo?.video}
                label="Link Video"
                variant="bordered"
                type="text"
              />
            )}
          />
          <Button
            type="submit"
            color="primary"
            className="mt-2 disabled:bg-default-500 disabled:text-white text-black"
            disabled={isPendingUpdate }
            isDisabled={isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default VideoTab;
