import React, { useState } from "react";
import "./Login.css";

export const Login: React.FC = () => {
  const [tipoAcesso, setTipoAcesso] = useState<string>("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando login:", { tipoAcesso, usuario, senha, lembrar });
    // Aqui você chama sua API ou lógica de autenticação
  };

  return (
    <div id="divTipoAcesso" className="login-container">
      {/* Erro genérico */}
      <div id="msgErroTipoAcesso" className="txtErro">
        <strong id="idMsgErroTipoAcesso"></strong>
      </div>

      <p className="mb10 aviso">
        <b>Selecione um tipo de acesso</b>
      </p>

      {/* Tipos de acesso */}
      <div className="tipo-acesso">
        <label>
          <input
            type="radio"
            name="tipoAcesso"
            value="usuario"
            checked={tipoAcesso === "usuario"}
            onChange={() => setTipoAcesso("usuario")}
          />
          Usuário
        </label>

        <label>
          <input
            type="radio"
            name="tipoAcesso"
            value="icp"
            checked={tipoAcesso === "icp"}
            onChange={() => setTipoAcesso("icp")}
          />
          ICP Brasil
        </label>

        <label>
          <input
            type="radio"
            name="tipoAcesso"
            value="certificado"
            checked={tipoAcesso === "certificado"}
            onChange={() => setTipoAcesso("certificado")}
          />
          Certificado Digital Bradesco
        </label>
      </div>

      {/* Login por usuário/senha */}
      {tipoAcesso === "usuario" && (
        <form id="boxLogin" className="login-box" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={lembrar}
                onChange={() => setLembrar(!lembrar)}
              />
              Lembrar meu acesso
            </label>

            <a
              href="https://www.ne12.bradesconetempresa.b.br/ibpjtrocamaster/trocarSenhaMasterInicial.jsf"
              target="_blank"
              rel="noreferrer"
            >
              Esqueci usuário/senha
            </a>
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      )}

      {/* Placeholder para ICP Brasil */}
      {tipoAcesso === "icp" && (
        <div className="info-box">
          <p>
            Conecte seu certificado ICP Brasil para continuar o processo de
            autenticação.
          </p>
        </div>
      )}

      {/* Placeholder para Certificado Digital Bradesco */}
      {tipoAcesso === "certificado" && (
        <div className="info-box">
          <p>
            Selecione seu certificado digital Bradesco no dispositivo conectado.
          </p>
        </div>
      )}
    </div>
  );
};
