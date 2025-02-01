import AuthProvider from "@/redux/AuthProvider";
import { ReactNode } from "react";

export default function PaperLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <AuthProvider>
        {children}
      </AuthProvider>
    </main>
  );
}
