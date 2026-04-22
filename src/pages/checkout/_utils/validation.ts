import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Required')
    .max(512, 'Max 512 characters')
    .refine((val) => {
      const words = val.trim().split(/\s+/).filter(Boolean)
      return words.length >= 2
    }, 'Please enter your first and last name')
    .refine((val) => {
      const words = val.trim().split(/\s+/).filter(Boolean)
      return words.every((w) => w.length >= 2)
    }, 'Each name must be at least 2 characters'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  zipCode: z
    .string()
    .min(1, 'Required')
    .regex(/^\d{4,10}$/, 'Invalid zip code'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Required')
    .refine((val) => {
      const dob = new Date(val)
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      const notYetHadBirthday =
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      return age - (notYetHadBirthday ? 1 : 0) >= 18
    }, 'You must be at least 18 years old'),
  gender: z.enum(['female', 'male'], { required_error: 'Required' }),
  cardHolderName: z.string().min(1, 'Required'),
  cardNumber: z.string().min(1, 'Required'),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format')
    .refine((val) => {
      const [month, year] = val.split('/')
      const expiry = new Date(2000 + Number(year), Number(month) - 1, 1)
      const now = new Date()
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return expiry >= currentMonth
    }, 'Card has expired'),
  cvv: z.string().regex(/^\d{3,4}$/, '3 or 4 digits'),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
