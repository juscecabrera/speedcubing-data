import Main from "../components/Main";
import Times from "../components/Times";
import StatsSM from "../components/StatsSM";
import { TimerProvider } from "./contexts/TimerContext";

/*
Por hacer:
1. Hacer la logica para tener los tiempos en localStorage
2. Poder registrar realmente las soluciones con data precisa
2. Hacer las animaciones para que cuando se agregue un nuevo tiempo se cree una nueva carta y se elimine la anterior
3. Hacer la logica de las stats
4. Poder exportar e importar los tiempos
5. Poder tener multiples sesiones
6. Poder modificar soluciones (DNF, +2, Copiar, eliminar, etc)
7. Arreglar las posiciones de los botones
8. Agregar tiempo de inspeccion
9. Agregar autenticacion


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
