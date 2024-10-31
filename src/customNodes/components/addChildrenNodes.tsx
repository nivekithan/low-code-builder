import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AddChildrenNodes() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size={"xl"}
          className="absolute text-[9px] bottom-[-30px] left-1/2 transform -translate-x-1/2"
        >
          Add Children Node
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-y-8">
        <SheetHeader>
          <SheetTitle>Add Nodes</SheetTitle>
          <SheetDescription>
            Choose any nodes from our 150+ nodes
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-y-2">
          <Button variant="outline">If/Else Condition</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
