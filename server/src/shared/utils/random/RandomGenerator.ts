export class RandomGenerator {
  public  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public  generateId(length: number = 6): string {
    let result = "";
    const digits = "0123456789";

    for (let i = 0; i < length; i++) {
      result += digits[Math.floor(Math.random() * digits.length)];
    }

    return result;
  }
}
