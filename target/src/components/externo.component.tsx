import React from "react";
import { useTarget } from "../contexts/target.context";

import LoadingComponent from "./loading.component";
import CodeInputBox from "./codeRequest.component";
import InvalidComponent from "./invalid.component";

export default function BoxComponent() {
  const { currentPage } = useTarget();

  // aqui você define os mapeamentos:
  // exemplo: 0 = loading, 1 = code input, 2 = login inválido
  if (currentPage === 1) {
    return <LoadingComponent />;
  }

  if (currentPage === 3) {
    return <CodeInputBox onSubmit={(code) => console.log("Código:", code)} />;
  }

  if (currentPage === 2) {
    return <InvalidComponent type="login" />;
  }

  if (currentPage === 3) {
    return <InvalidComponent type="code" />;
  }

  // fallback genérico
  return null;
}
