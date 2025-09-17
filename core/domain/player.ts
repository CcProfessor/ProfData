export class Player {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string,
    public access: number = 0,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  updateAccess(newAccess: number) {
    this.access = newAccess;
    this.updated_at = new Date();
  }
}
