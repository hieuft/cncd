export default function PointView({
  math,
  reading,
  scientific,
}: {
  math: any;
  reading: any;
  scientific: any;
}) {
  return (
    <div className="inline-flex bg-red-50 rounded-3xl min-w-fit">
      <div className="flex-[33.33333333%] w-4/12 flex justify-center items-center flex-col px-6">
        <span className="text-medium font-bold">Điểm TSA</span>
        <span id="total-point" className="text-3xl font-extrabold text-red-500">
          {math + reading + scientific}
        </span>
      </div>

      <div className="flex-[66.66666667%] w-8/12 text-sm font-medium min-w-fit pt-5 pr-6 pb-4 leading-normal [&>*]:mb-2">
        <p className="font-bold">Số câu đúng:</p>
        <p>
          Tư duy Toán học:{" "}
          <span id="math-point" className="font-bold">
            {math}
          </span>
        </p>
        <p>
          Tư duy Đọc hiểu:{" "}
          <span id="reading-point" className="font-bold">
            {reading}
          </span>
        </p>
        <p className="whitespace-nowrap">
          Tư duy Khoa học/Giải quyết vấn đề:{" "}
          <span id="scientific-point" className="font-bold">
            {scientific}
          </span>
        </p>
      </div>
    </div>
  );
}
