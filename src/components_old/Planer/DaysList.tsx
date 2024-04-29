export const DaysList = () => {
  return (
    <div className="flex h-full w-full flex-col items-center border-2 p-2">
      <div className="flex h-1/6 w-full items-center justify-center gap-10">
        <button>{"<"}</button>
        <span>Tydzień 1</span>
        <button>{">"}</button>
      </div>
      <div className="flex h-full w-full items-center gap-2">
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
        <div className="h-full w-full border-2"></div>
      </div>
    </div>
  );
};
