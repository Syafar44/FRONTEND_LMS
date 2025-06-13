import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import kajianServices from "@/services/kajian.service";
import { IKajian } from "@/types/Kajian";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKajian = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKajianById = async () => {
    const { data } = await kajianServices.getKajianById(`${query.id}`);
    return data.data;
  };

  const { data: dataKajian, refetch: refetchKajian } = useQuery({
    queryKey: ["Kajian"],
    queryFn: getKajianById,
    enabled: isReady,
  });

  const updateKajian = async (payload: IKajian) => {
    const { data } = await kajianServices.updateKajian(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKajian,
    isPending: isPendingMutateUpdateKajian,
    isSuccess: isSuccessMutateUpdateKajian,
  } = useMutation({
    mutationFn: (payload: IKajian) => updateKajian(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKajian();
      setToaster({
        type: "success",
        message: "Success update Kajian",
      });
    },
  });

  const handleUpdateKajian = (data: IKajian) => {
    const payload = {
      ...data,
    }
    mutateUpdateKajian(payload)
  };

  return {
    dataKajian,
    handleUpdateKajian,
    isPendingMutateUpdateKajian,
    isSuccessMutateUpdateKajian,
  };
};

export default useDetailKajian;
