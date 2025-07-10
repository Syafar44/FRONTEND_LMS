"use client";
import YouTube from "react-youtube";
import { Button } from "@heroui/react";
import { GoScreenFull } from "react-icons/go";
import Image from "next/image";
import useYouTubeWithControls from "./useYouTubeWithControls";

interface PropTypes {
  videoId: string;
  isPending: boolean;
  subCompetency: string;
  selectionId: string;
  isView: boolean
}

const YouTubeWithControls = (props: PropTypes) => {
    const { videoId, isPending, subCompetency, selectionId, isView = false } = props
    const {
        router,
        onReady,
        handlePlay,
        handlePause,
        handleFullscreen,
        handleVideoEnd,
        isPlayerVisible,
        isPlay,
        setIsPlay,
        hasWatchedToEnd,
        containerRef,
    } = useYouTubeWithControls(selectionId)

    return (
        <div className="grid gap-5 w-full">
            <div
                ref={containerRef} 
                className="aspect-video w-full mx-auto overflow-hidden rounded-xl shadow border">
                {isPlayerVisible ? (
                    <YouTube
                        videoId={videoId}
                        onReady={(event) => {
                            onReady(event);
                            event.target.playVideo();
                            setIsPlay(true);
                        }}
                        onEnd={handleVideoEnd}
                        opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                            fs: 0,
                            disablekb: 1,
                        },
                        }}
                        className="w-full h-full pointer-events-none"
                    />
                ): (
                    <div className="w-full h-full relative">
                        <Image src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} className="object-cover w-full h-full" width={200} height={200} alt="video lms" />
                    </div>
                )}
            </div>

            <div className="flex justify-between gap-4">
                {isPlay ? (
                    <Button onPress={handlePause} className="bg-primary text-gray-700" isDisabled={isPending}>Pause Video</Button>
                ) : (
                    <Button onPress={handlePlay} className="bg-primary text-gray-700" isDisabled={isPending}>Play Video</Button>
                )}
                {isPlay && (
                    <Button onPress={handleFullscreen} variant="ghost" isIconOnly className="shadow-lg"><GoScreenFull size={20} /></Button>
                )}
                {(isView) && (
                    <Button 
                        className="text-primary bg-gray-700" 
                        isDisabled={isPending}
                        onPress={() => router.push(`/kuis/${subCompetency}`)}
                        >
                            Kerjakan Kuis
                    </Button>
                )}
            </div>
        </div>
    );
};

export default YouTubeWithControls;