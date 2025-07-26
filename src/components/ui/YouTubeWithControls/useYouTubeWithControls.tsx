import videoServices from "@/services/video.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube";
import Swal from "sweetalert2";

const useYouTubeWithControls = (selectionId: string, subCompetency: string) => {
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

    const handleCloseFullscreen = () => {
        const isFullscreen = !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
        );

        if (!isFullscreen) return;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    };

    const handleVideoEnd = async () => {
        const res = await videoServices.addVideo({bySubCompetency: `${selectionId}`})
        setIsPlay(false)
        setHasWatchedToEnd(true);
        handleCloseFullscreen()
        Swal.fire({
            title: 'Video Selesai',
            text: 'Anda telah selesai menonton video, lanjutkan dengan mengerjakan kuis',
            showCancelButton: false,
            confirmButtonText: 'Kerjakan Sekarang',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
            }
        }).then(() => {
            router.push(`/kuis/${subCompetency}?sub=${selectionId}`)
        })
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