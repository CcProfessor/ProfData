import React from "react";
import "./Rodape.css";

export const Rodape: React.FC = () => {
  return (
    <div id="rodape" className="after login">
      <div className="miolo">
        {/* Logos */}
        <ul className="listaLogos">
          <li className="item1">
            <a href="#" title="Bradesco Dia e Noite" className="tabindex">
              Dia&amp;Noite
            </a>
          </li>
          <li className="item2">
            <a href="#" title="Bradesco Internet Banking ISO 9001" className="tabindex">
              ISO 9001
            </a>
          </li>
        </ul>

        {/* Menu inferior (vazio no exemplo original) */}
        <ul className="listaMenuInferior"></ul>

        {/* Telefones */}
        <ul className="listaTelefones">
          <li className="item1" title="Capitais e Regiões Metropolitanas e Demais Localidades.">
            <span>Bradesco Apoio à Empresa</span> 3003-1000
          </li>
          <li className="item2" title="SAC - Serviço de Apoio ao Cliente Cancelamento, Reclamações e Informações">
            <span>Alô Bradesco</span> 0800 202 1000
          </li>
          <li className="item3" title="Atendimento 24h, 7 dias por semana">
            <span>Deficiente Auditivo ou de Fala</span> 0800 722 0099
          </li>
          <li className="item4 ultimo" title="Atendimento de segunda a sexta-feira das 8h às 18h, exceto feriados">
            <span>Ouvidoria</span> 0800 727 9933
          </li>
        </ul>
      </div>
    </div>
  );
};
