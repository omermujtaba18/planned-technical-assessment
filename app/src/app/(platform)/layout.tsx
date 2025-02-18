import Header from "@/components/shared/header";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-4xl"> {children}</div>
      </main>
      <footer></footer>
    </>
  );
}
