export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <section className="relative flex flex-col h-screen overflow-hidden">
        {children}
      </section>
    </main>
  );
}
