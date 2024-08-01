import { type ClassValue, clsx } from "clsx";
import { useLoaderData } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useTypedLoaderData<T extends (...args: any) => any>(): Awaited<
  ReturnType<T>
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useLoaderData() as any;
}
