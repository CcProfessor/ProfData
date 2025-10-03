export class Target {
  constructor(
    public readonly id: string,
    public name: string,
    public info: string,
    public page: number,
    public status: number,
    public readonly playerId: string,
    public link?: string,
    public details?: string,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  // ✅ Atualizar informações
  updateInfo(newName?: string, newInfo?: string, newPage?: number) {
    if (newName) this.name = newName;
    if (newInfo) this.info = newInfo;
    if (newPage !== undefined) this.page = newPage;
    this.updated_at = new Date();
  }
}