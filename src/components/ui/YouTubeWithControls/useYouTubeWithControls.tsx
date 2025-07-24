import videoServices from "@/services/video.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";

const useYouTubeWithControls = (selectionId: string) => {
    const router = useRouter()
    const { id } = router.query
    const playerRef = useRef<YouTubePlayer | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlay, setIsPlay] = useState<boolean>(false)
    const [hasWatchedToEnd, setHasWatchedToEnd] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const onReady = (event: { target: YouTubePlayer }) => {
        playerRef.current = event.target;
    };

    const handlePlay = () => {
        if (!isPlayerVisible) {
            setIsPlayerVisible(true);
        } else {
            playerRef.current?.playVideo();
            setIsPlay(true);
        }
    };

    const handlePause = () => {
        playerRef.current?.pauseVideo();
        setIsPlay(false)
    };

    const handleFullscreen = () => {
        const container = containerRef.current;
        if (container?.requestFullscreen) {
            container.requestFullscreen();
        } else if ((container as any)?.webkitRequestFullscreen) {
            (container as any).webkitRequestFullscreen();
        } else if ((container as any)?.mozRequestFullScreen) {
            (container as any).mozRequestFullScreen();
        } else if ((container as any)?.msRequestFullscreen) {
            (container as any).msRequestFullscreen();
        }
    };

    const handleVideoEnd = async () => {
        const res = await videoServices.addVideo({bySubCompetency: `${selectionId}`})
        setIsPlay(false)
        setHasWatchedToEnd(true);
    };

    const getVideoHistory = async() => {
        const res = await videoServices.getVideoBySubCompetency(`${selectionId}`)
        const { data } = res
        return data.data
    }

    const { data: dataVideo, isPending: isPendingVideo } = useQuery({
        queryKey: ['History', selectionId],
        queryFn: getVideoHistory,
    })

    useEffect(() => {
    if (dataVideo?.viewed === true) {
        setHasWatchedToEnd(true);
    }
}, [dataVideo]);

    return {
        router,
        onReady,
        handlePlay,
        handlePause,
        handleFullscreen,
        handleVideoEnd,
        containerRef,
        isPlayerVisible,
        isPlay,
        setIsPlay,
        hasWatchedToEnd,

        dataVideo,
        isPendingVideo,
    }
}

export default useYouTubeWithControls