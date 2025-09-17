export class Code {
  constructor(
    public readonly id: string,
    public readonly targetId: string,
    public status: number = 0,
    public codev?: string,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  // ✅ Alterar status do código
  updateStatus(newStatus: number) {
    this.status = newStatus;
    this.updated_at = new Date();
  }
}
