export const generateScramble = (length = 20): string => {
  const moves = ["R", "L", "U", "D", "F", "B"];
  const modifiers = ["", "'", "2"];
  let scramble = "";
  let lastMove = "";

  for (let i = 0; i < length; i++) {
    let move = moves[Math.floor(Math.random() * moves.length)];

    // Evitar movimientos consecutivos en la misma cara
    while (move === lastMove) {
      move = moves[Math.floor(Math.random() * moves.length)];
    }

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble += `${move}${modifier} `;
    lastMove = move;
  }

  return scramble.trim(); // Elimina el espacio final
};

  // Formatear el tiempo en minutos:segundos
export const formatTime = (ms: number) => {
  const totalSeconds = ms / 1000;
  if (totalSeconds < 60) {
    return totalSeconds.toFixed(2); // Muestra solo segundos si es menor a 60
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    return `${minutes}:${seconds.padStart(5, '0')}`; // Muestra minutos:segundos
  }
};
