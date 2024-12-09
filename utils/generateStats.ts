// Tipos necesarios
  interface Solve {
    solveTime: number;
    scramble: string;
    date: string;
  }
  
  interface SessionData {
    solves: Solve[];
  }
  
  /**
   * Calcula el promedio de los últimos N solves eliminando el mejor y el peor tiempo.
   * @param sessionData - Los datos de la sesión que contienen los solves.
   * @param n - Número de solves a considerar.
   * @returns El promedio de los tiempos después de eliminar el mejor y el peor, o null si no hay suficientes solves.
   */
  export const averageOfN = (sessionData: SessionData, n: number): number | null => {
    if (sessionData.solves.length < n) return null;
  
    const lastNSolves = sessionData.solves
      .slice(-n) // Últimos N solves
      .map(solve => solve.solveTime);
  
    const maxTime = Math.max(...lastNSolves);
    const minTime = Math.min(...lastNSolves);
  
    const filteredTimes = lastNSolves.filter(time => time !== maxTime && time !== minTime);
  
    // Promedio con dos decimales sin redondeo
    const avg = filteredTimes.reduce((sum, time) => sum + time, 0) / filteredTimes.length;
    return parseFloat(avg.toFixed(2)); // Asegura dos decimales sin redondear
  };
  
  /**
   * Calcula el mejor y el peor promedio de N solves de toda la sesión.
   * @param sessionData - Los datos de la sesión que contienen los solves.
   * @param n - Número de solves a considerar en cada ventana.
   * @returns Un array donde el primer elemento es el mejor promedio y el segundo el peor, o null si no hay suficientes solves.
   */
  export const bestWorstAverageOfN = (sessionData: SessionData, n: number): [number | null, number | null] => {
    if (sessionData.solves.length < n) return [null, null];
  
    const allAverages: number[] = [];
  
    for (let i = 0; i <= sessionData.solves.length - n; i++) {
      const subset = sessionData.solves.slice(i, i + n).map(solve => solve.solveTime);
      const maxTime = Math.max(...subset);
      const minTime = Math.min(...subset);
      const filteredTimes = subset.filter(time => time !== maxTime && time !== minTime);
      const avg = filteredTimes.reduce((sum, time) => sum + time, 0) / filteredTimes.length;
  
      // Guardar el promedio con dos decimales sin redondeo
      allAverages.push(parseFloat(avg.toFixed(2))); 
    }
  
    const bestAverage = Math.min(...allAverages);
    const worstAverage = Math.max(...allAverages);
  
    return [bestAverage, worstAverage];
  };
  