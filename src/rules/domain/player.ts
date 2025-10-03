export class Player {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string,
    public access: number = 0,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  // ✅ Atualizar nível de acesso
  updateAccess(newAccess: number) {
    this.access = newAccess;
    this.updated_at = new Date();
  }

  // ✅ Validar credenciais (exemplo simplificado)
  validatePassword(password: string): boolean {
    return this.password === password;
  }

  // ✅ Atualizar dados do jogador
  updateProfile(username?: string, password?: string) {
    if (username) this.username = username;
    if (password) this.password = password;
    this.updated_at = new Date();
  }
}