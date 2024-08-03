import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}
