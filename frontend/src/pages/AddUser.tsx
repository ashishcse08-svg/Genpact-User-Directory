import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usersApi } from '../services/users';
import { userSchema, type UserFormValues } from '../validation/userSchema';

type FormValues = { name: string; age: string; city: string; state: string; pincode: string };
const initial: FormValues = { name: '', age: '', city: '', state: '', pincode: '' };
type Errors = Partial<Record<keyof FormValues, string>>;
export default function AddUser() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const update = (field: keyof FormValues, value: string) => {
    setValues(v => ({ ...v, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = userSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach(issue => { const field = issue.path[0] as keyof FormValues; if (!next[field]) next[field] = issue.message; });
      setErrors(next); return;
    }
    setSaving(true);
    try { await usersApi.create(parsed.data); toast.success('User created successfully'); navigate('/'); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'Unable to create user. Please try again.'); }
    finally { setSaving(false); }
  }
  const fields: { key: keyof FormValues; label: string; placeholder: string; type?: string; hint?: string }[] = [
    { key: 'name', label: 'Full name', placeholder: 'e.g. Asha Rao', hint: '2–100 characters' },
    { key: 'age', label: 'Age', placeholder: 'e.g. 28', type: 'number', hint: 'Between 0 and 120' },
    { key: 'city', label: 'City', placeholder: 'e.g. Pune' },
    { key: 'state', label: 'State', placeholder: 'e.g. Maharashtra' },
    { key: 'pincode', label: 'Pincode', placeholder: 'e.g. 411001', hint: '4–10 characters' },
  ];
  return <section className="page-wrap"><div className="page-heading"><div><p className="eyebrow">DIRECTORY / NEW RECORD</p><h1>Add a user</h1><p className="subtitle">Create a new profile in your directory.</p></div><span className="step-pill">01 <span>/ 02</span></span></div><form className="form-card" onSubmit={submit} noValidate><div className="card-heading"><div className="icon-tile">＋</div><div><h2>User information</h2><p>Fields marked with <b>*</b> are required.</p></div></div><div className="form-grid">{fields.map(field => <div className={`field ${field.key === 'name' ? 'field-wide' : ''}`} key={field.key}><label htmlFor={field.key}>{field.label} <span>*</span></label><input id={field.key} name={field.key} type={field.type ?? 'text'} min={field.type === 'number' ? 0 : undefined} max={field.type === 'number' ? 120 : undefined} step={field.type === 'number' ? 1 : undefined} value={String(values[field.key])} placeholder={field.placeholder} onChange={e => update(field.key, e.target.value)} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined} />{errors[field.key] ? <small className="field-error" id={`${field.key}-error`}>{errors[field.key]}</small> : field.hint ? <small className="field-hint">{field.hint}</small> : null}</div>)}</div><div className="form-actions"><span className="secure-note">Your information is stored securely in the local database.</span><button className="primary-button" type="submit" disabled={saving}>{saving ? <><span className="button-spinner"/> Saving…</> : <>Create user <span>→</span></>}</button></div></form></section>;
}
