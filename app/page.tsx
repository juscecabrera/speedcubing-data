import Main from "../components/Main";
import Times from "../components/Times";
import StatsSM from "../components/StatsSM";
import { TimerProvider } from "./contexts/TimerContext";

/*
Por hacer:
1. Poder tener multiples sesiones
2. Poder modificar soluciones (DNF, +2, Copiar, eliminar, etc)
3. Agregar tiempo de inspeccion
4. Agregar autenticacion

7. Arreglar las posiciones de los botones
4. Poder exportar e importar los tiempos
2. (opcional, para ux) Hacer las animaciones para que cuando se agregue un nuevo tiempo se cree una nueva carta y se elimine la anterior

Por algun motivo esta el solve 5 veces en prod
*/


export default function Home() {
  return (
    <div className="bg-speedblue text-white font-jetbrains">
      <TimerProvider>
        <Main />
        <Times />
        <StatsSM />
      </TimerProvider>
    </div>
  );
}
