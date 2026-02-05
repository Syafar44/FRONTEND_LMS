import { ToasterContext } from "@/contexts/ToasterContext";
import asesmenServices from "@/services/asesmen.service";
import { IAsesmen } from "@/types/Asesmen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailAsesmen = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getAsesmenById = async () => {
    const { data } = await asesmenServices.getAsesmenById(`${query.id}`);
    return data.data;
  };

  const { data: dataAsesmen, refetch: refetchAsesmen } = useQuery({
    queryKey: ["Asesmen"],
    queryFn: getAsesmenById,
    enabled: isReady,
  });

  const updateAsesmen = async (payload: IAsesmen) => {
    const { data } = await asesmenServices.updateAsesmen(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateAsesmen,
    isPending: isPendingMutateUpdateAsesmen,
    isSuccess: isSuccessMutateUpdateAsesmen,
  } = useMutation({
    mutationFn: (payload: IAsesmen) => updateAsesmen(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchAsesmen();
      setToaster({
        type: "success",
        message: "Success update Asesmen",
      });
    },
  });

  const handleUpdateAsesmen = (data: IAsesmen) => {
    const payload = {
      ...data,
    }
    mutateUpdateAsesmen(payload)
  };

  return {
    dataAsesmen,
    handleUpdateAsesmen,
    isPendingMutateUpdateAsesmen,
    isSuccessMutateUpdateAsesmen,
  };
};

export default useDetailAsesmen;
