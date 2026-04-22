import { checkoutSchema } from './validation.ts'

describe('checkoutSchema', () => {
  it('passes when all fields are valid', () => {
    const today = new Date()
    const validDob = `${today.getFullYear() - 25}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    const validExpiration = `${String(nextMonth.getMonth() + 1).padStart(2, '0')}/${String(nextMonth.getFullYear()).slice(-2)}`

    const result = checkoutSchema.safeParse({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      zipCode: '10001',
      dob: validDob,
      gender: 'male',
      cardHolderName: 'John Doe',
      cardNumber: '4242424242424242',
      expiration: validExpiration,
      cvv: '123',
    })

    expect(result.success).toBe(true)
  })

  it('fails with the correct error for each invalid field', () => {
    const today = new Date()
    const tooYoungDob = `${today.getFullYear() - 10}-01-01`
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const expiredExpiration = `${String(lastMonth.getMonth() + 1).padStart(2, '0')}/${String(lastMonth.getFullYear()).slice(-2)}`

    const result = checkoutSchema.safeParse({
      fullName: 'John', // only one word → missing last name
      email: 'not-an-email', // invalid format
      zipCode: 'ABC', // non-numeric
      dob: tooYoungDob, // under 18
      gender: 'other', // not in enum
      cardHolderName: '', // empty
      cardNumber: '', // empty
      expiration: expiredExpiration, // past date
      cvv: '12', // too short (min 3 digits)
    })

    const errors = result.error?.flatten().fieldErrors

    expect(errors?.fullName).toContain('Please enter your first and last name')
    expect(errors?.email).toContain('Invalid email')
    expect(errors?.zipCode).toContain('Invalid zip code')
    expect(errors?.dob).toContain('You must be at least 18 years old')
    expect(errors?.gender).toBeDefined()
    expect(errors?.cardHolderName).toContain('Required')
    expect(errors?.cardNumber).toContain('Required')
    expect(errors?.expiration).toContain('Card has expired')
    expect(errors?.cvv).toContain('3 or 4 digits')
  })
})
