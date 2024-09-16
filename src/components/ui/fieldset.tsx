import React from "react";

export function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-1">{children}</div>;
}

export function Fieldset({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}
