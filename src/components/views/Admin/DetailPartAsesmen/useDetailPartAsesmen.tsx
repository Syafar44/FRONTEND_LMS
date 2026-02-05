import { ToasterContext } from "@/contexts/ToasterContext";
import partAsesmenServices from "@/services/partAsesmen.service";
import { IPartAsesmen } from "@/types/Asesmen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailPartAsesmen = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getPartAsesmenById = async () => {
    const { data } = await partAsesmenServices.getPartAsesmenById(`${query.id}`);
    return data.data;
  };

  const { data: dataPartAsesmen, refetch: refetchPartAsesmen } = useQuery({
    queryKey: ["PartAsesmen"],
    queryFn: getPartAsesmenById,
    enabled: isReady,
  });

  const updatePartAsesmen = async (payload: IPartAsesmen) => {
    const { data } = await partAsesmenServices.updatePartAsesmen(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdatePartAsesmen,
    isPending: isPendingMutateUpdatePartAsesmen,
    isSuccess: isSuccessMutateUpdatePartAsesmen,
  } = useMutation({
    mutationFn: (payload: IPartAsesmen) => updatePartAsesmen(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchPartAsesmen();
      setToaster({
        type: "success",
        message: "Success update PartAsesmen",
      });
    },
  });

  const handleUpdatePartAsesmen = (data: IPartAsesmen) => {
    const payload = {
      ...data,
    }
    mutateUpdatePartAsesmen(payload)
  };

  return {
    dataPartAsesmen,
    handleUpdatePartAsesmen,
    isPendingMutateUpdatePartAsesmen,
    isSuccessMutateUpdatePartAsesmen,
  };
};

export default useDetailPartAsesmen;
