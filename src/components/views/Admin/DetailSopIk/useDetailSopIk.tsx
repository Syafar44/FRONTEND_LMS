import { ToasterContext } from "@/contexts/ToasterContext";
import sopIkServices from "@/services/sopIk.service";
import { ISopIk } from "@/types/SopIk";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailSopIk = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getSopIkById = async () => {
    const { data } = await sopIkServices.getSopIkById(`${query.id}`);
    return data.data;
  };

  const { data: dataSopIk, refetch: refetchSopIk } = useQuery({
    queryKey: ["SopIk"],
    queryFn: getSopIkById,
    enabled: isReady,
  });

  const updateSopIk = async (payload: ISopIk) => {
    const { data } = await sopIkServices.updateSopIk(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateSopIk,
    isPending: isPendingMutateUpdateSopIk,
    isSuccess: isSuccessMutateUpdateSopIk,
  } = useMutation({
    mutationFn: (payload: ISopIk) => updateSopIk(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchSopIk();
      setToaster({
        type: "success",
        message: "Success update POST TEST MINGGUAN",
      });
    },
  });

  const handleUpdateSopIk = (data: ISopIk) => mutateUpdateSopIk(data)

  return {
    dataSopIk,
    handleUpdateSopIk,
    isPendingMutateUpdateSopIk,
    isSuccessMutateUpdateSopIk,
  };
};

export default useDetailSopIk;
