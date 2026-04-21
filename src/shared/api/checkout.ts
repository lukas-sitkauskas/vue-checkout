export interface CheckoutPayload {
  fullName: string
  email: string
  zipCode: string
  dob: string
  gender: 'female' | 'male'
  cardHolderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

export class CheckoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CheckoutError'
  }
}

// Test card that always triggers a declined error (mirrors Stripe's test cards).
const DECLINED_CARD = '4000000000009995'

export async function submitCheckout(payload: CheckoutPayload): Promise<void> {
  // Imitated backend call — resolves after 1 s
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const rawNumber = payload.cardNumber.replace(/\s/g, '')
  if (rawNumber === DECLINED_CARD) {
    throw new CheckoutError('Your card was declined. Please use a different payment method.')
  }

  console.log('Checkout submitted:', payload)
}
