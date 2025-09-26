import React from "react";
import "../styles/Rodape.css";

export const Rodape: React.FC = () => {
  return (
    <div id="rodape">
      <div className="miolo">

        {/* Seção de destaque à esquerda (Logos) */}
        <div className="rodape-destaque">
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
        </div>

        {/* Telefones em colunas */}
        <div className="rodape-telefones">
          <div className="coluna">
            <span>Bradesco Apoio à Empresa</span>
            <p>3003-1000</p>
          </div>
          <div className="coluna">
            <span>Alô Bradesco</span>
            <p>0800 202 1000</p>
          </div>
          <div className="coluna">
            <span>Deficiente Auditivo ou de Fala</span>
            <p>0800 722 0099</p>
          </div>
          <div className="coluna">
            <span>Ouvidoria</span>
            <p>0800 727 9933</p>
          </div>
        </div>

      </div>
    </div>
  );
};
