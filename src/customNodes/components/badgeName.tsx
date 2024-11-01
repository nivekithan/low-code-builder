import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

export function BadgeName({ children }: { children: ReactNode }) {
  return <Badge className="text-[10px] self-start">{children}</Badge>;
}
