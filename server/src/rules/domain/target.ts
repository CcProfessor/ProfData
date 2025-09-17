export class Target {
  constructor(
    public readonly id: string,
    public readonly playerId: string,
    public page: number = 0,   // 🔹 começa como 0 se não informado
    public name?: string,
    public info?: string,
    public link?: string,
    public details?: string,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  // ✅ Atualizar informações (os opcionais podem ser preenchidos com o tempo)
  updateInfo(
    newName?: string,
    newInfo?: string,
    newPage?: number,
    newLink?: string,
    newDetails?: string,
  ) {
    if (newName) this.name = newName;
    if (newInfo) this.info = newInfo;
    if (newPage !== undefined) this.page = newPage;
    if (newLink !== undefined) this.link = newLink;
    if (newDetails !== undefined) this.details = newDetails;
    this.updated_at = new Date();
  }
}