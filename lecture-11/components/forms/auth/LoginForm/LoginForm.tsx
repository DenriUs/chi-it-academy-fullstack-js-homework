'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';

import { loginApiThunk } from '@/store/slices/user.slice';
import { tryCatchAsync } from '@/lib/try-catch.helpers';
import { HTTP_EXCEPTIONS } from '@/lib/http.exceptions';
import type { ApiError } from '@/api/api.error';

import { useAppDispatch } from '@/hooks/store/useAppDispatch';
import { useAppSelector } from '@/hooks/store/useAppSelector';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import { InputGroupButton } from '@/components/ui/InputGroup';
import { InputWidthAddons } from '@/components/ui/InputWithAddons';

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/Field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

import { loginSchema } from './schema';
import type { LoginSchema } from './schema';

export function LoginForm({ ...props }: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const isSubmitting = useAppSelector((state) => state.user.isLoading);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginSchema) => {
    const { error } = await tryCatchAsync(dispatch(loginApiThunk(values)).unwrap());
    if (error) {
      if (
        (error as ApiError).statusCode &&
        (error as ApiError).statusCode === HTTP_EXCEPTIONS.badRequest
      ) {
        setIsError(true);
        return;
      }
      toast.error('Unexpected Error', {
        description: 'Something went wrong during the login attempt.',
      });
      return;
    }
    router.replace('/');
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your credentials to login to your account</CardDescription>
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {isError && (
              <Alert variant='destructive' className='max-w-md'>
                <AlertCircleIcon />
                <AlertTitle>Incorrect credentials</AlertTitle>
                <AlertDescription>
                  Please check the username and password you entered and try again
                </AlertDescription>
              </Alert>
            )}
            <Field>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && <Spinner />} Login
              </Button>
              <FieldDescription className='text-center'>
                Don&apos;t have an account? <Link href='/register'>register</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
