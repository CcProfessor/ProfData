import React, { useEffect, useMemo, useState } from "react";
import { useTarget } from "../contexts/target.context";

/**
 * Loading: 3 quadrados 8x8, com border vermelho 1px.
 * A cada segundo um fica totalmente vermelho, depois o próximo, em loop.
 */

const SQUARE_SIZE = 24; // 8px fica pequeno; 24px é mais visível. Troque para 8 se quiser estritamente 8.
export default function LoadingComponent() {
  const { socket, targetData } = useTarget();
  const [active, setActive] = useState<number>(0);

  // se quiser reagir ao targetData.page (por ex. sair do loading), pode observar targetData
  useEffect(() => {
    // ex: se page mudou para outro valor, você poderia parar anim
  }, [targetData?.page]);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % 3);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const squares = useMemo(() => [0, 1, 2], []);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {squares.map((i) => {
        const isActive = i === active;
        return (
          <div
            key={i}
            style={{
              width: SQUARE_SIZE,
              height: SQUARE_SIZE,
              border: "1px solid red", // contorno vermelho 1px
              background: isActive ? "red" : "transparent",
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
