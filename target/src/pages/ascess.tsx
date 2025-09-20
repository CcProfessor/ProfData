import React from "react";
import { useTarget } from "../contexts/target.context";
import LoadingComponent from "../components/loading.component";
import AscessComponent from "../components/ascess.component";
import InvalidComponent from "../components/invalid.component";

/**
 * Ascess page decides which component to show according to currentPage:
 *
 * 0: initial -> redirect to login (app routing)
 * 1: waiting/loading -> show LoadingComponent
 * 2: error -> show Invalid under login OR show loading + invalid
 * 3: code request -> show code request (not implemented here)
 * 4: access granted -> show AscessComponent
 * 5: request inside account -> show codeRequest as well (not implemented)
 *
 * We'll implement 1 (loading), 2 (invalid), 4 (ascess). CodeRequest placeholder not implemented.
 */

export default function AscessPage() {
  const { currentPage } = useTarget();

  if (currentPage === 1) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Aguarde</h1>
        <LoadingComponent />
      </div>
    );
  }

  if (currentPage === 2) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Erro</h1>
        <InvalidComponent type="login" />
      </div>
    );
  }

  // 3 & 5 would be CodeRequest — for now we fallback to Ascess UI
  if (currentPage === 4) {
    return (
      <div style={{ padding: 16 }}>
        <AscessComponent />
      </div>
    );
  }

  // fallback: default to loading to avoid blank
  return (
    <div style={{ padding: 16 }}>
      <h1>Carregando...</h1>
      <LoadingComponent />
    </div>
  );
}
