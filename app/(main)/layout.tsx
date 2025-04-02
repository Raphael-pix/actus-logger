import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Wrapper from "@/components/wrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Wrapper>
        <Navbar />
        <div>{children}</div>
      </Wrapper>
    </div>
  );
}
