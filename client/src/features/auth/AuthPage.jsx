import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Seo } from '../../shared/ui/Seo.jsx';
import { useLoginMutation, useRegisterMutation } from '../../store/api.js';
import { setCredentials } from './authSlice.js';

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8)
});

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [registerAccount] = useRegisterMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const submit = async (values) => {
    try {
      const action = values.name ? registerAccount : login;
      const payload = await action(values).unwrap();
      dispatch(setCredentials(payload));
      toast.success('Session secured');
      navigate(payload.user.role === 'admin' ? '/admin' : '/account');
    } catch {
      toast.error('API unavailable. Use demo access while backend .env is configured.');
    }
  };
  const demoAccess = (role) => {
    dispatch(setCredentials({
      accessToken: `demo-${role}-token`,
      user: { id: `demo-${role}`, name: role === 'admin' ? 'NOIR Admin' : 'Private Client', email: `${role}@noirthread.example`, role }
    }));
    toast.success(`${role === 'admin' ? 'Admin' : 'Client'} demo session ready`);
    navigate(role === 'admin' ? '/admin' : '/account');
  };

  return (
    <>
      <Seo title="Sign in | NOIRTHREAD" description="Access your NOIRTHREAD account." path="/auth" />
      <section className="noir-container grid min-h-[76vh] place-items-center py-16">
        <form onSubmit={handleSubmit(submit)} className="w-full max-w-md border border-noir-border bg-noir-surface p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-noir-muted">Private client access</p>
          <h1 className="mt-4 font-heading text-4xl font-bold">Enter NOIRTHREAD</h1>
          <Field label="Name" error={errors.name?.message} input={register('name')} />
          <Field label="Email" error={errors.email?.message} input={register('email')} />
          <Field label="Password" type="password" error={errors.password?.message} input={register('password')} />
          <button disabled={isSubmitting} className="mt-6 w-full bg-noir-accent py-4 font-semibold text-noir-bg">Continue securely</button>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => demoAccess('customer')} className="border border-noir-border py-3 text-sm text-noir-muted">Client demo</button>
            <button type="button" onClick={() => demoAccess('admin')} className="border border-noir-border py-3 text-sm text-noir-muted">Admin demo</button>
          </div>
          <button type="button" className="mt-4 w-full border border-noir-border py-4 text-noir-muted">Forgot password</button>
        </form>
      </section>
    </>
  );
}

function Field({ label, input, error, type = 'text' }) {
  return (
    <label className="mt-5 block text-sm text-noir-muted">
      {label}
      <input {...input} type={type} className="mt-2 w-full border border-noir-border bg-noir-bg px-4 py-3 text-noir-text outline-none focus:border-noir-accent" />
      {error && <span className="mt-1 block text-noir-error">{error}</span>}
    </label>
  );
}
