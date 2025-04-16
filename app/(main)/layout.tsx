import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Wrapper from "@/components/wrapper";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Toaster/>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <div>{children}</div>
      </Wrapper>
    </div>
  );
}
