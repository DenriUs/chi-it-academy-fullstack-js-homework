export type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className='flex w-full min-h-svh items-center justify-center'>{children}</main>;
}
