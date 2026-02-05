import * as XLSX from "xlsx";

export const downloadRetAsesmenExcel = (
  asesmenPart: string = '',
  asesmenList: any[] = [],
  retAsesmenList: any[] = []
) => {
  const workbook = XLSX.utils.book_new();
  let hasSheet = false;

  asesmenList.forEach((asesmen) => {
    const filteredRet = retAsesmenList.filter(
      (ret) => ret.byAsesmen === asesmen._id
    );

    if (!filteredRet.length) return;

    const sheetData: { Question: string; Answer: string }[] = [];

    filteredRet.forEach((ret) => {
      if (!Array.isArray(ret.answers) || !ret.answers.length) return;

      ret.answers.forEach((ans: { question: string; answer: string }) => {
        sheetData.push({
          Question: ans.question,
          Answer: ans.answer,
        });
      });
    });

    if (!sheetData.length) return;

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, asesmen.title);

    hasSheet = true;
  });

  if (!hasSheet) {
    alert("Tidak ada data asesmen untuk diexport");
    return;
  }

  XLSX.writeFile(workbook, `hasil-asesmen-${asesmenPart}.xlsx`);
};
