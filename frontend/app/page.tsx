import Markets from "./markets/page"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-baseBackgroundL0 text-baseTextHighEmphasis">
      <div className="flex flex-col mx-auto w-full max-w-7xl px-3 sm:px-6">
        <Markets/>
      </div>
    </div>
  );
}
