import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ISubCompetency } from "@/types/Competency";
import useVideoTab from "./useVideoTab";
import YouTube from "react-youtube";

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
        <h1 className="w-full text-xl font-bold">Sub Competency Video</h1>
        <p className="w-full text-small text-default-400">
          Manage Video of this Sub Competency. You can update the video link
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
              className="rounded-lg flex flex-col items-center p-5"
            >
              <YouTube
                  videoId={currentVideo}
                  className="w-full rounded-lg"
              />
            </Skeleton>
          </div>
          <p className="text-sm font-medium text-default-700">Paste link new video</p>
          <Controller
            name="video"
            control={controlUpdateVideo}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                label="https://www.youtube.com/watch?v=********"
                variant="bordered"
                type="text"
                isInvalid={errorsUpdateVideo.video !== undefined}
                errorMessage={errorsUpdateVideo.video?.message}
                className="mb-2"
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
