import { Code } from '../domain/codes';
import { CodePersistence, CodeResponse } from '../interfaces/codes.interface';

export class CodesMapper {
  // 🔹 Domínio -> Persistência (para salvar no banco)
  static toPersistence(code: Code): CodePersistence {
    return {
      id: code.id,
      targetId: code.targetId,
      status: code.status,
      codev: code.codev || "",   // 🔹 string vazia se não informado
      value: code.value || "",   // 🔹 idem
      created_at: code.created_at,
      updated_at: code.updated_at,
    };
  }

  // 🔹 Persistência -> Domínio (quando lemos do banco)
  static toDomain(raw: CodePersistence): Code {
    return new Code(
      raw.id,
      raw.targetId,
      raw.status,
      raw.codev ?? "",
      raw.value ?? "",
      new Date(raw.created_at),
      new Date(raw.updated_at),
    );
  }

  // 🔹 Domínio -> Response (para expor na API)
  static toResponse(code: Code): CodeResponse {
    return {
      id: code.id,
      targetId: code.targetId,
      status: code.status,
      codev: code.codev,
      value: code.value,
      created_at: code.created_at,
      updated_at: code.updated_at,
    };
  }
}
