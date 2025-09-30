import React from "react";
import { useTarget } from "../contexts/target.context";

import LoadingComponent from "./loading.component";
import { CodeInputBox } from "./codeRequest.component";

export function BoxComponent() {
  const { currentPage } = useTarget();

  if (currentPage === 1) {
    return <LoadingComponent />;
  }

  if (currentPage === 3) {
    return <CodeInputBox onSubmit={(code) => console.log("Código:", code)} />;
  }

  return null;
}
