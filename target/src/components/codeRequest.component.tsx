import React, { useState, FormEvent } from "react";
import { uuidv7 } from "uuidv7";
import { useParams } from "react-router-dom"; 
import { sendCodeResponse } from "../target-socket";
import { CodeResponseDto } from "../rules/interfaces/gateway.interface";

type CodeInputBoxProps = {
  /** Placeholder para o input (padrão: "Insira seu código aqui") */
  placeholder?: string;
  /** Texto do botão (padrão: "Enviar") */
  buttonLabel?: string;
  /** Callback chamado quando o usuário envia o código */
  onSubmit?: (code: string) => void;
  /** Desabilita a caixa (padrão: false) */
  disabled?: boolean;
};

const { id: targetIdFromRoute } = useParams<{ id: string }>();

export const CodeInputBox: React.FC<CodeInputBoxProps> = ({
  placeholder = "Insira seu código aqui",
  buttonLabel = "Enviar",
  onSubmit,
  disabled = false,
}) => {
  const { id: targetIdFromRoute } = useParams<{ id: string }>(); // ✅ dentro do componente

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabled || loading) return;
    const trimmed = code.trim();
    if (!trimmed) return;

    try {
      setLoading(true);

      if (onSubmit) {
        await Promise.resolve(onSubmit(trimmed));
      } else {
        sendCodeResponse({
          targetId: targetIdFromRoute || "unknown-target",
          codeId: uuidv7(),
          codev: trimmed,
        });
      }

      setCode("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-4 bg-white rounded-2xl shadow-md"
      aria-label="Caixa de inserir código"
    >
      <label className="block text-sm font-medium mb-2 text-gray-700">
        Insira seu código
      </label>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-400"
          aria-label="Campo de código"
        />

        <button
          type="submit"
          disabled={disabled || loading || !code.trim()}
          className={`px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${
            disabled || loading || !code.trim()
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          aria-label="Botão de enviar código"
        >
          {loading ? "Enviando..." : buttonLabel}
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Digite o código e pressione Enter ou clique em "{buttonLabel}".
      </p>
    </form>
  );
};