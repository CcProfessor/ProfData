import React from "react";

type InvalidType = "login" | "code";

export default function InvalidComponent({ type }: { type: InvalidType }) {
  const text = type === "login" ? "Login ou senha inválidos" : "Código de verificação inválido";
  return (
    <div style={{ marginTop: 12, color: "crimson", fontWeight: 600 }}>
      {text}
    </div>
  );
}
