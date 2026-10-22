import { z } from 'zod';
export const userSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  age: z.preprocess(value => value === '' ? undefined : value, z.coerce.number({ invalid_type_error: 'Age is required' }).int('Age must be a whole number').min(0, 'Age cannot be below 0').max(120, 'Age cannot exceed 120')),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  pincode: z.string().trim().min(4, 'Pincode must be at least 4 characters').max(10, 'Pincode cannot exceed 10 characters'),
});
export type UserFormValues = z.infer<typeof userSchema>;
