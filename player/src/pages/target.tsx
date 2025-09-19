import React from "react";
import { TargetProvider } from "../contexts/target.context";
import { TargetWrapper } from "../components/target.components";

export default function TargetPage() {
  return (
    <TargetProvider>
      <main style={{ padding: "2rem" }}>
        <h1>Gerenciamento de Target</h1>
        <TargetWrapper />
      </main>
    </TargetProvider>
  );
}
