export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  comparehash(payload: string, hashed: string): Promise<boolean>;
}
