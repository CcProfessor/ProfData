import React from "react";
import "../styles/AscessoSeguro.css";
import logo1 from "../imagens/logo01.png";

export const AcessoSeguro: React.FC = () => {
  const hoje = new Date();

  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const diaSemana = diasSemana[hoje.getDay()];
  const dia = hoje.getDate();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  const dataFormatada = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

  return (
    <div id="topo">
      {/* Linha com logo + data, dentro da faixa */}
      <div className="faixa-data">
        <img
          src={logo1}
          alt="Você está no Acesso Seguro. Utilize TAB para navegar."
          className="pngfix tabindex tabfirst img-util"
          tabIndex={2}
        />

        <ul className="menuSessao">
          <li>{dataFormatada}</li>
        </ul>
      </div>

      {/* Linha com logo + títulos, abaixo da faixa */}
      <div className="direita after">
        <img
          src={logo1}
          alt=""
          aria-hidden="true"
          className="logo-espaco"
        />

        <div className="conteudo-topo">
          <div className="login_title2">
            <span id="headerTitulo">
              <h1>Acesso Seguro</h1>
            </span>

            <div className="login-subtitulo">
              <span id="headerSubtitulo">
                <h2>
                  Acesse o Bradesco Net Empresa de forma segura seguindo os
                  passos abaixo:
                </h2>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
