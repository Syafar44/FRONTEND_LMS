import { useRouter } from "next/router";

const useAktivitas = () => {
    const router = useRouter();

    const handleTabChange = () => {
        router.replace({
          pathname: router.pathname,
          query: {
            limit: 12,
            page: 1,
            search: "",
          },
        }, undefined, { shallow: true });
      };

      return {
        handleTabChange
      }
}

export default useAktivitas;
