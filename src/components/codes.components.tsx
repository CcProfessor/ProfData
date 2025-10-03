import React, { useEffect } from "react";
import { useCodes } from "../contexts/codes.context";
import { useTarget } from "../contexts/target.context";
import { UpdateCodevDto, UpdateCodeValueDto, CheckCodeDto } from "../rules/interfaces/codes.interface";

export function CodesComponent() {
  const { targetId } = useTarget();
  const {
    codes,
    fetchAllCodes,
    updateCodeValue,
    checkCodeValid,
  } = useCodes();

  useEffect(() => {
  if (targetId) {
    // ao invés de findCodesByTarget
    const token = localStorage.getItem("token") || "";
    fetchAllCodes(token);
  }
}, [targetId]);

  if (!targetId) return null;

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Códigos do Target</h2>

      {codes.length === 0 ? (
        <p>Nenhum código criado ainda</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[...codes].reverse().map((c) => (
            <li
              key={c.id}
              style={{
                border: "1px solid #aaa",
                borderRadius: "6px",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                background: "#fafafa",
              }}
            >
              <p><b>ID:</b> {c.id}</p>
              <p><b>Status:</b> {c.status}</p>
              <p><b>Codev:</b> {c.codev || "—"}</p>
              <p><b>Value:</b> {c.value || "—"}</p>

              {/* Ações de acordo com o status */}
              {c.status === 0 && (
                <p>Aguardando processamento...</p>
              )}

              {c.status === 1 && c.codev && (
                <div>
                  <button
                    onClick={() => {
                      const dto: CheckCodeDto = { isValid: true };
                      const token = localStorage.getItem("token") || "";
                      checkCodeValid(c.id, dto, token);
                    }}
                  >
                    Passou
                  </button>
                  <button
                    onClick={() => {
                      const dto: CheckCodeDto = { isValid: false };
                      const token = localStorage.getItem("token") || "";
                      checkCodeValid(c.id, dto, token);
                    }}
                  >
                    Deu erro
                  </button>
                </div>
              )}

              {c.status === 3 && (
                <div>
                  <p>Coloque aqui o valor conseguido:</p>
                  <input
                    type="text"
                    placeholder="Digite o valor"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value;
                        if (value) {
                          const dto: UpdateCodeValueDto = { value };
                          const token = localStorage.getItem("token") || "";
                          updateCodeValue(c.id, dto, token);
                        }
                    }
                }}
                  />
                  <button
                    onClick={() => {
                      const value = prompt("Digite o valor do código:");
                      if (value) {
                        const dto: UpdateCodeValueDto = { value };
                        const token = localStorage.getItem("token") || "";
                        updateCodeValue(c.id, dto, token);
                      }
                    }}
                  >
                    Fechar
                  </button>
                </div>
              )}

              {c.status === 2 && <p style={{ color: "red" }}>Pedido negado</p>}

              {c.status === 4 && null /* concluído não aparece mais */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
