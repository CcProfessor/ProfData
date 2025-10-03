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
      {/* Faixa vermelha só com a data */}
      <div className="faixa-data">
        <ul className="menuSessao">
          <li>{dataFormatada}</li>
        </ul>
      </div>

      {/* Linha abaixo com logo + título/subtítulo */}
      <div className="conteudo-linha">
        <img
          src={logo1}
          alt="Você está no Acesso Seguro. Utilize TAB para navegar."
          className="logo-principal"
          tabIndex={2}
        />

        <div className="conteudo-topo">
          <div className="login_title2">
            <h1>Acesso Seguro</h1>
            <div className="login-subtitulo">
              <h2>
                Acesse o Bradesco Net Empresa de forma segura seguindo os
                passos abaixo:
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
