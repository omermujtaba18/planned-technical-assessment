import Header from "@/components/shared/header";
import { MemoryDialog } from "@/components/shared/memory-dialog";
import { ShareDialog } from "@/components/shared/share-dialog";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MemoryDialog />
      <ShareDialog />
      <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-4xl"> {children}</div>
      </main>
      <footer></footer>
    </>
  );
}
