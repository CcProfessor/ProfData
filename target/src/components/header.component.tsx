import React from "react";
import "./AcessoSeguro.css";

export const AcessoSeguro: React.FC = () => {
  // Formata data atual
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
    <div className="direita after">
      <ul id="_id59" className="menuSessao">
        <li id="_id60">{dataFormatada}</li>
      </ul>

      <div className="login_title2">
        <span id="headerTitulo">
          <h1>Acesso Seguro</h1>
        </span>

        <div className="login-subtitulo">
          <span id="headerSubtitulo">
            <h2>
              Acesse o Bradesco Net Empresa de forma segura seguindo os passos
              abaixo:
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};
