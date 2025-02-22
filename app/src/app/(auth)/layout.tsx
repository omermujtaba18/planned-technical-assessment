import Header from "@/components/shared/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header hideNav />
      <main className="bg-gradient-to-b from-purple-50 to-white min-h-[calc(100vh-60px)]">
        <div className="container mx-auto px-4 py-6 max-w-xl">{children}</div>
      </main>
      <footer></footer>
    </>
  );
}
