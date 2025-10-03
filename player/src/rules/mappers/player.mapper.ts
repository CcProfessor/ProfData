import { Player } from '../domain/player';
import { PlayerPersistence } from '../interfaces/player.interfaces';

export class PlayerMapper {
  // 🔹 Converte do domínio para o que vai para o banco
  static toPersistence(player: Player): any {
    return {
      id: player.id,
      username: player.username,
      password: player.password,   // ⚠️ depois podemos aplicar hash
      access: player.access,
      created_at: player.created_at,
      updated_at: player.updated_at,
    };
  }

  // 🔹 Converte do banco para o domínio (recriando a entidade)
  static toDomain(raw: PlayerPersistence): Player {
    return new Player(
      raw.id,
      raw.username,
      raw.password,
      raw.access,
      new Date(raw.created_at),
      new Date(raw.updated_at),
    );
  }
}