import React, { useEffect } from "react";
import { useCodes } from "../contexts/codes.context";
import { useTarget } from "../contexts/target.context";
import { UpdateCodevDto, UpdateCodeValueDto, CheckCodeDto } from "../rules/interfaces/codes.interface";

export function CodesComponent() {
  const { targetId } = useTarget();
  const { codes, findCodesByTarget, updateCode } = useCodes();

  useEffect(() => {
    if (targetId) {
      findCodesByTarget(targetId);
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
                      updateCode(c.id, { status: 3 }, "checkcode", dto);
                    }}
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => {
                      const dto: CheckCodeDto = { isValid: false };
                      updateCode(c.id, { status: 2 }, "checkcode", dto);
                    }}
                  >
                    Negar
                  </button>
                </div>
              )}

              {c.status === 3 && (
                <div>
                  <input
                    type="text"
                    placeholder="Digite o valor"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value;
                        if (value) {
                          const dto: UpdateCodeValueDto = { value };
                          updateCode(c.id, { status: 4, value }, "valuecode", dto);
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const value = prompt("Digite o valor do código:");
                      if (value) {
                        const dto: UpdateCodeValueDto = { value };
                        updateCode(c.id, { status: 4, value }, "valuecode", dto);
                      }
                    }}
                  >
                    Concluir
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
