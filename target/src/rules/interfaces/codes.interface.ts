// DTOs e tipos para Codes

export class CreateCodeDto {
  targetId!: string;  // o Target relacionado
}

export class UpdateCodeValueDto {
  value!: string;
}

export class UpdateCodevDto {
  codev!: string;
}

export class CheckCodeDto {
  isValid!: boolean; // true → status 1, false → status 2
}

// Resposta simplificada
export class CodeResponse {
  id!: string;
  targetId!: string;
  status!: number;
  codev?: string;
  value?: string;
  created_at!: Date;
  updated_at!: Date;
}

export class CodePersistence {
  id!: string;
  targetId!: string;
  status!: number;
  codev?: string | null;
  value?: string | null;
  created_at!: Date;
  updated_at!: Date;
}

export class CodeFast {
  id!: string;
  targetId!: string;
  status!: number;
}