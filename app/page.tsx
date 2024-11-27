import Image from "next/image";
import Main from "./components/Main";
import Times from "./components/Times";
import StatsSM from "./components/StatsSM";
import TimeCardDetail from "./components/TimeCardDetail";
import { TimerProvider } from "./contexts/TimerContext";

export default function Home() {
  return (
    <div className="bg-speedblue text-white font-jetbrains">
      <TimerProvider>
        <Main />
        <Times />
        <StatsSM />
        <TimeCardDetail />

      </TimerProvider>
    </div>
  );
}