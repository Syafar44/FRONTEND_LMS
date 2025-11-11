import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabScoreIk.constants";
import useTabScoreIk from "./useTabScoreIk";
import { convertTime } from "@/utils/date";
import { IProfile, } from "@/types/Auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { ICompetency, ISubCompetency } from "@/types/Competency";

const TabScoreIk = () => {
  const { push, isReady, query } = useRouter();
  const { 
    dataScore,
    isPendingScore,
    isRefetchingScore,

    dataIk,
    isPendingIk,

    handleDownloadExcel,
    ik,
    setik,
  } = useTabScoreIk()
  
  const { 
    setUrl,
    } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  interface ScoreType {
    createdAt?: string;
    bySubCompetency?: {
      title?: string;
      byCompetency?: {
        title?: string;
      };
    };
    total_score?: number;
    total_question?: number;
    createdBy?: {
      fullName?: string;
    };
    [key: string]: any;
  }

  const renderCell = useCallback(
    (score: ScoreType, columnKey: Key) => {
      const cellValue = score[columnKey as keyof typeof score];

      switch (columnKey) {
        case "createdAt":
          return (
            <p>{convertTime(`${score.createdAt}`)}</p>
          );
        case "title":
          return (
            <h2>{score?.byIk?.title}</h2>
          );
        case "poin":
          return (
            <h2>{(Number(score?.total_score) / Number(score?.total_question) * 100).toFixed(0)}</h2>
          );
        case "createdBy":
          return (
            <h2>{score?.createdBy?.fullName}</h2>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  const listCompetency = dataIk?.data || [];

  return (
    <section>
      <section className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-[400px]">
          <Select
            className="max-w-xl"
            placeholder="Pilih Kompetensi"
            selectedKeys={ik ? new Set([ik]) : new Set()}
            variant="bordered"
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string; 
              setik(value);
            }}
          >
            {listCompetency.map((competency: ICompetency) => (
              <SelectItem key={competency._id}>{competency.title}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            onPress={handleDownloadExcel}
            className="bg-primary"
          >
            Download Excel
          </Button>
        </div>
    </section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS}
          data={dataScore?.data || []}
          emptyContent="Score is empty"
          isLoading={isPendingScore || isRefetchingScore || isPendingIk }
          renderCell={renderCell}
          totalPages={dataScore?.pagination?.totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabScoreIk;
