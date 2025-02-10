/*
 * To avoid floating point operation errors, we can use this class to handle
 * precise number operations.
 */
export class RationalNumber{
  private constructor(public readonly dividend: number, public readonly divisor: number) {}

  get reciprocal() {
    return new RationalNumber(this.divisor, this.dividend)
  }

  get inverse(){
    return new RationalNumber(-this.dividend, this.divisor)
  }

  static fromInteger(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('How dare you invoke "fromInteger" with a non-integer value?')
    }

    return new RationalNumber(value, 1)
  }

  static generateReducedFraction(dividend: number, divisor: number) {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero')
    }
    if (!Number.isInteger(divisor) || !Number.isInteger(dividend)) {
      throw new Error('Divisor and dividend must be integers')
    }

    const gcdValue = gcd(dividend, divisor)
    return new RationalNumber(
      dividend / gcdValue,
      divisor / gcdValue
    )
  }

  static fromFloatString(str: string) {
    if (!str.includes('.')) {
      return new RationalNumber(parseInt(str), 1)
    }
    if (str.startsWith('.')) str = '0' + str

    const [integerPart, decimalPart] = str.split('.')
    const dividend = parseInt(integerPart + decimalPart)
    const divisor = Math.pow(10, decimalPart.length)
    return RationalNumber.generateReducedFraction(dividend, divisor)
  }

  toString() {
    if (this.divisor === 1) return `${this.dividend}`
    return `${this.dividend} / ${this.divisor}`
  }

  toNumber() {
    return this.dividend / this.divisor
  }

  add(other: RationalNumber) {
    return RationalNumber.generateReducedFraction(
      this.dividend * other.divisor + other.dividend * this.divisor,
      this.divisor * other.divisor
    )
  }

  subtract(other: RationalNumber) {
    return this.add(other.inverse)
  }

  multiply(other: RationalNumber) {
    return RationalNumber.generateReducedFraction(
      this.dividend * other.dividend,
      this.divisor * other.divisor
    )
  }

  divide(other: RationalNumber) {
    return this.multiply(other.reciprocal)
  }

  pow(other: RationalNumber) {
    const exponent = other.toNumber()
    return RationalNumber.generateReducedFraction(
      this.dividend ** exponent,
      this.divisor ** exponent
    )
  }

  root(other: RationalNumber) {
    return this.pow(other.reciprocal)
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