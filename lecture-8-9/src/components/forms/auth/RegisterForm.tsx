import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpStatusCode } from 'axios';
import { toast } from 'sonner';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

import { APP_ROUTES, APP_ROUTE_NAMES } from '@/router/constants';
import { loginApiThunk, registerApiThunk } from '@/store/slices/user.slice';
import { tryCatchAsync } from '@lib/try-catch.helpers';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppNavigate } from '@hooks/useAppNavigate';

import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert';
import { Input } from '@components/ui/Input';
import { InputGroupButton } from '@components/ui/InputGroup';
import { InputWidthAddons } from '@components/ui/InputWithAddons';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@components/ui/Field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Spinner } from '@components/ui/Spinner';

import { AppLink } from '@components/router/AppLink';

import { registerSchema } from './schemas';
import type { RegisterSchema } from './schemas';

export function RegisterForm({ ...props }: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const isSubmitting = useAppSelector((state) => state.user.isLoading);

  const dispatch = useAppDispatch();

  const navigate = useAppNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async ({ username, password }: RegisterSchema) => {
    const { error: registerError } = await tryCatchAsync(
      dispatch(registerApiThunk({ username, password })).unwrap(),
    );
    const { error: loginError } = await tryCatchAsync(
      dispatch(loginApiThunk({ username, password })).unwrap(),
    );
    if (registerError || loginError) {
      if (
        registerError.type === 'API_ERROR' &&
        registerError.statusCode === HttpStatusCode.BadRequest
      ) {
        console.log(registerError);
        setIsError(true);
        return;
      }
      toast.error('Registration Failed', {
        description: 'Something went wrong during registration process.',
      });
      return;
    }
    navigate('/');
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Register an account</CardTitle>
        <CardDescription>Enter required information to register your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='username'>Username</FieldLabel>
                  <Input
                    {...field}
                    id='username'
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <InputWidthAddons
                    {...field}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    rightAddon={
                      <InputGroupButton
                        size='icon-xs'
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    }
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                  )}
                </Field>
              )}
            />
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
                  <InputWidthAddons
                    {...field}
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    rightAddon={
                      <InputGroupButton
                        size='icon-xs'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    }
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>Please confirm your password.</FieldDescription>
                  )}
                </Field>
              )}
            />
            {isError && (
              <Alert variant='destructive' className='max-w-md'>
                <AlertCircleIcon />
                <AlertTitle>Username is already taken</AlertTitle>
                <AlertDescription>
                  Please enter different username for your account
                </AlertDescription>
              </Alert>
            )}
            <Field>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && <Spinner />} Register
              </Button>
              <FieldDescription className='text-center'>
                Already have an account?{' '}
                <AppLink to='/login'>{APP_ROUTE_NAMES[APP_ROUTES.login]}</AppLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
