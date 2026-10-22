import { describe, expect, it } from 'vitest';
import { userSchema } from '../validation/userSchema';
describe('userSchema', () => {
  it('accepts a valid user', () => { expect(userSchema.safeParse({ name: 'Asha Rao', age: '28', city: 'Pune', state: 'Maharashtra', pincode: '411001' }).success).toBe(true); });
  it('rejects invalid name, age and pincode', () => { expect(userSchema.safeParse({ name: 'A', age: '121', city: '', state: 'Delhi', pincode: '12' }).success).toBe(false); });
});
