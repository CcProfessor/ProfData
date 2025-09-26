Letter: 
- Remetende: number
- Destino: number
- Middle: boolean

Server = 0 // (Back End)
Target = 1 // (Front End do Cliente)
Player = 2 // (Front End do Operador)

Do Player pro Server:
(2, 0, false)

Do Target pro Server:
(1, 0, false)

Do Server pro Player:
(0, 2, false)

Do Server pro Targer:
(0, 1, false)

MAS:

Do Player pro Target:
Emite primeiro para o server: (2, 1, false)
ENtão o server emite para o Player: (2, 1, true)

Do Target pro Player:
Emite primeiro para o server: (1, 2, false)
ENtão o server emite para o Player: (1, 2, true)

Observe que o Server foi o caminho do meio. Então ele recebeu, e mudou o middle para true e enviou.