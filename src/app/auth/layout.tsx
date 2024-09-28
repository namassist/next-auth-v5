export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex justify-center items-center">
      {children}
    </section>
  );
}
