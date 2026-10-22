import type { User, UserInput } from '../types';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5080/api/users';
async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try { const body = await response.json(); message = body.message ?? body.title ?? message; } catch { /* keep fallback */ }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export const usersApi = {
  list: () => request<User[]>(API_URL),
  get: (id: number) => request<User>(`${API_URL}/${id}`),
  create: (user: UserInput) => request<User>(API_URL, { method: 'POST', body: JSON.stringify(user) }),
  update: (id: number, user: UserInput) => request<void>(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  remove: (id: number) => request<void>(`${API_URL}/${id}`, { method: 'DELETE' }),
};
