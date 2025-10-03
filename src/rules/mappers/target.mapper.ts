import { Target } from '../domain/target';
import { TargetPersistence, TargetResponse } from '../interfaces/target.interfaces';

export class TargetMapper {
  // 🔹 Domínio -> Persistência (para salvar no banco)
  static toPersistence(target: Target): TargetPersistence {
    return {
      id: target.id,
      playerId: target.playerId,
      page: target.page,
      name: target.name || "",
      info: target.info || "",
      link: target.link || "",
      details: target.details || "",
      status: target.status || 0,
      created_at: target.created_at,
      updated_at: target.updated_at,
    };
  }

  // 🔹 Persistência -> Domínio (quando lemos do banco)
  static toDomain(raw: TargetPersistence): Target {
    return new Target(
      raw.id,
      raw.name || "",
      raw.info || "",
      raw.page,
      raw.status,
      raw.playerId,
      raw.link || "",
      raw.details || "",
      new Date(raw.created_at),
      new Date(raw.updated_at),
    );
  }

  // 🔹 Domínio -> Response (para expor na API, sem mudar nada)
  static toResponse(target: Target): TargetResponse {
    return {
      id: target.id,
      playerId: target.playerId,
      page: target.page,
      name: target.name,
      info: target.info,
      link: target.link,
      details: target.details,
      status: target.status,
      created_at: target.created_at,
      updated_at: target.updated_at,
    };
  }
}
