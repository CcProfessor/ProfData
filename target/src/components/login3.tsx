// Passo1.tsx
import React from "react";
import "./Passo1.css";

export default function Passo1() {
  return (
    <div id="passo1" className="boxTp">
      <div className="bgt"></div>
      <span className="passo">1</span>

      <div id="divTipoAcesso" className="div-tipo-acesso">
        {/* Usuário e Senha */}
        <div id="tipoAcesso" className="fl mr20">
          <div id="msgErroTipoAcesso" className="none">
            <strong id="idMsgErroTipoAcesso"></strong>
          </div>
          <p className="mb10">Insira o usuário e a senha</p>

          <table className="tabFrmTp3 hidden">
            <tbody>
              <tr>
                <td>
                  <span className="HtmlOutputTextBradesco">
                    <input
                      type="radio"
                      id="rdoTipoAcesso02"
                      name="rdoTipoAcesso"
                      className="frmRadio tabindex"
                      value="7"
                      title="Marque para selecionar usuário e senha"
                      defaultChecked
                      tabIndex={3}
                    />
                  </span>
                </td>
                <td>
                  <span className="HtmlOutputTextBradesco">
                    <label className="tp3" htmlFor="rdoTipoAcesso02">
                      Usuário e Senha
                    </label>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Localizar Certificado */}
        <div
          id="localizeCertificadoDigital"
          className="fl mr20 fl divCertificado tabindex hidden"
          tabIndex={4}
        >
          <span className="HtmlOutputTextBradesco">
            <p className="mb10">
              Localize seu<br />
              <strong>Certificado Digital</strong>
            </p>
          </span>
        </div>

        {/* Box de Login */}
        <div
          id="boxLogin"
          className="boxTp2 fl mr20 w200 none divUsuarioSenha"
        >
          <div id="msgErroBoxLogin" className="txtErro">
            <strong id="titleErroUsua" className="tabindex" tabIndex={8}></strong>
          </div>

          <table className="tabFrmTp3">
            <colgroup>
              <col width="50" />
              <col width="5" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label
                    className="tp3"
                    htmlFor="identificationForm:txtUsuario"
                  >
                    <span
                      title="Informe o nome do usuário"
                      className="HtmlOutputTextBradesco"
                    >
                      Usuário
                    </span>
                  </label>
                </td>
                <td></td>
                <td>
                  <input
                    id="identificationForm:txtUsuario"
                    name="identificationForm:txtUsuario"
                    type="text"
                    title="Informe o nome do usuário"
                    className="frmTxt1 tabindex"
                    tabIndex={9}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <table className="mb10">
            <colgroup>
              <col width="50" />
              <col width="5" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label
                    className="tp3"
                    htmlFor="identificationForm:txtSenha"
                  >
                    <span
                      title="Informe a senha de 8 a 20 dígitos"
                      className="HtmlOutputTextBradesco"
                    >
                      Senha
                    </span>
                  </label>
                </td>
                <td></td>
                <td>
                  <input
                    type="password"
                    id="identificationForm:txtSenha"
                    name="identificationForm:txtSenha"
                    title="Informe a senha de 8 a 20 digitos"
                    className="frmTxt1 tabindex"
                    tabIndex={10}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="clr"></div>
      <div className="bgb"></div>
    </div>
  );
}
