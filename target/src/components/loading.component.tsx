import React, { useEffect, useMemo, useState } from "react";
import { useTarget } from "../contexts/target.context";

const SQUARE_SIZE = 24; // tamanho dos quadrados

export default function LoadingComponent() {
  const { targetData } = useTarget();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % 3);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const squares = useMemo(() => [0, 1, 2], []);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {squares.map((i) => (
        <div
          key={i}
          style={{
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            border: "1px solid red",
            background: i === active ? "red" : "transparent",
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
