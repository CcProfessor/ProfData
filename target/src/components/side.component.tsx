import React from "react";
import "../styles/DicaCadeado.css";

export const DicaCadeado: React.FC = () => {
  return (
    <div className="container-dicaCadeado">
      <div className="boxP14" id="dicaCadeado" title="">
        <span className="HtmlOutputTextBradesco">
          <span className="titulo-principal">
            Se proteja contra golpes e fraudes
          </span>

          <p className="subtitulo" title="Componente de segurança Topaz">
            Componente de segurança Topaz
          </p>

          <ul className="mb10" title="">
            <li title="">
              <p className="mb10" title="">
                O Bradesco nunca entra em contato por telefone ou e-mail para pedir
                sua chave de segurança durante instalações ou atualizações.
              </p>
              <p className="mb10" title="">
                Por isso, não forneça essas informações a ninguém.
              </p>
            </li>
          </ul>

          <p className="subtitulo" title="Golpe do falso gerente">
            Golpe do falso gerente
          </p>

          <ul className="mb10" title="">
            <li title="">
              <p className="mb10" title="">
                O Bradesco <b>nunca</b> entra em contato pedindo dados pessoais,
                senhas, chaves de segurança, atualizações cadastrais ou sistêmicas e{" "}
                <b>nem solicitando transações.</b>
              </p>
              <p className="mb10" title="">
                Por isso, não forneça essas informações a ninguém.
              </p>
              <p className="mb10" title="">
                Se receber esse tipo de ligação, desconfie e desligue. Em caso de
                dúvidas, entre em contato com o banco por meio dos{" "}
                <b>canais oficiais</b>.
              </p>
              <p className="mb10" title="">
                <b>Nunca faça</b> transações a pedido de terceiros. Lembre-se: você é
                responsável pelas movimentações da sua conta.
              </p>
            </li>
          </ul>

          <div className="dicasSeguranca_1 none_i" id="dicasSeguranca_1"></div>
        </span>
      </div>
    </div>
  );
};
