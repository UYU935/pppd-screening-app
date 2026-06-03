import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 指定したDOM要素をA4縦のPDFに変換してダウンロードする。
 * jsPDFは日本語フォントを内蔵しないため、html2canvasで画像化してから貼り付ける。
 *
 * 縦に長い場合は、ページ内に上下・左右の余白を確保したうえで、
 * 元画像を「1ページに収まる高さ」ごとに分割して各ページに配置する。
 * これにより、用紙の端で唐突に内容が切れず、各ページに余白ができる。
 */
export async function generatePdfFromElement(
  element: HTMLElement,
  fileName = "PPPD傾向チェック結果.pdf"
): Promise<void> {
  const scale = 2;

  // 強制改ページしたい位置（data-pdf-break を付けた要素の先頭）を、
  // キャンバス座標（px）で取得しておく。
  const containerTop = element.getBoundingClientRect().top;
  const breakPositionsPx = Array.from(
    element.querySelectorAll<HTMLElement>("[data-pdf-break]")
  )
    .map((el) => (el.getBoundingClientRect().top - containerTop) * scale)
    .filter((y) => y > 1)
    .sort((a, b) => a - b);

  const canvas = await html2canvas(element, {
    scale,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ページ余白（mm）。上下を広めに取り、ページの切り替わりに間を持たせる。
  const marginTop = 16;
  const marginBottom = 16;
  const marginSide = 12;

  // 画像を配置できる領域（mm）
  const contentWidth = pageWidth - marginSide * 2;
  const contentHeight = pageHeight - marginTop - marginBottom;

  // mm ↔ px の換算（contentWidth に合わせて拡縮する前提）
  const mmPerPx = contentWidth / canvas.width;
  // 1ページに収まる元画像の高さ（px）
  const pageHeightPx = Math.floor(contentHeight / mmPerPx);

  let renderedPx = 0;
  let pageIndex = 0;

  while (renderedPx < canvas.height) {
    // このページに収まる上限の終端
    let sliceEndPx = Math.min(renderedPx + pageHeightPx, canvas.height);

    // ページ範囲内に強制改ページ位置があれば、その手前でページを終える
    // （改ページ対象のセクションは次ページの先頭から始まる）
    const nextBreak = breakPositionsPx.find(
      (b) => b > renderedPx + 1 && b < sliceEndPx
    );
    if (nextBreak !== undefined) {
      sliceEndPx = nextBreak;
    }

    const sliceHeightPx = sliceEndPx - renderedPx;

    // 元キャンバスから1ページ分を切り出す
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeightPx;
    const ctx = pageCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        renderedPx,
        canvas.width,
        sliceHeightPx,
        0,
        0,
        canvas.width,
        sliceHeightPx
      );
    }

    const sliceHeightMm = sliceHeightPx * mmPerPx;
    const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);

    if (pageIndex > 0) pdf.addPage();
    pdf.addImage(
      imgData,
      "JPEG",
      marginSide,
      marginTop,
      contentWidth,
      sliceHeightMm
    );

    renderedPx += sliceHeightPx;
    pageIndex += 1;
  }

  pdf.save(fileName);
}
