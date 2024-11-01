import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomEdgeId() {
  return `edge-${crypto.randomUUID()}`;
}

export function randomNodeId() {
  return `node-${crypto.randomUUID()}`;
}
