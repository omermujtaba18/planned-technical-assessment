import Header from "@/components/shared/Header";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
