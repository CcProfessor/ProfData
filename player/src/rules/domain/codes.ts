export class Code {
  constructor(
    public readonly id: string,
    public readonly targetId: string,
    public status: number = 0,
    public codev?: string,
    public value?: string,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  updateStatus(newStatus: number) {
    this.status = newStatus;
    this.updated_at = new Date();
  }

  public update(newStatus?: number, newCodev?: string) {
    if (newStatus !== undefined) {
      this.status = newStatus;
    }
    if (newCodev !== undefined) {
      this.codev = newCodev;
    }
    this.updated_at = new Date();
  }
}