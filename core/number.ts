/*
 * To avoid floating point operation errors, we can use this class to handle
 * precise number operations.
 */
export class RationalNumber{
  public divisor: number
  public dividend: number

  constructor(dividend: number, divisor: number) {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero')
    }
    if (!Number.isInteger(divisor) || !Number.isInteger(dividend)) {
      throw new Error('Divisor and dividend must be integers')
    }

    const gcdValue = gcd(dividend, divisor)

    this.dividend = dividend / gcdValue
    this.divisor = divisor / gcdValue
  }

  static fromFloatString(str: string) {
    if (!str.includes('.')) {
      return new RationalNumber(parseInt(str), 1)
    }
    if (str.startsWith('.')) str = '0' + str

    const [integerPart, decimalPart] = str.split('.')
    const dividend = parseInt(integerPart + decimalPart)
    const divisor = Math.pow(10, decimalPart.length)
    return new RationalNumber(dividend, divisor)
  }

  toString() {
    if (this.divisor === 1) return `${this.dividend}`
    return `${this.dividend} / ${this.divisor}`
  }

  toNumber() {
    return this.dividend / this.divisor
  }

  add(other: RationalNumber) {
    return new RationalNumber(
      this.dividend * other.divisor + other.dividend * this.divisor,
      this.divisor * other.divisor
    )
  }

  subtract(other: RationalNumber) {
    return new RationalNumber(
      this.dividend * other.divisor - other.dividend * this.divisor,
      this.divisor * other.divisor
    )
  }

  multiply(other: RationalNumber) {
    return new RationalNumber(
      this.dividend * other.dividend,
      this.divisor * other.divisor
    )
  }

  divide(other: RationalNumber) {
    return new RationalNumber(
      this.dividend * other.divisor,
      this.divisor * other.dividend
    )
  }
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}