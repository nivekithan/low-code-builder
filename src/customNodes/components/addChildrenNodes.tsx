import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useModifyNodes } from "@/features/editor/modifyNodes";
import { randomNodeId } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddChildrenNodes({ nodeId }: { nodeId: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { insertNodes } = useModifyNodes();

  function addIfElseCondition() {
    insertNodes(nodeId, {
      type: "ifAndElseCondition",
      data: {
        condition: { type: "astExpression", value: "false" },
        outputVariableName: "condition",
      },
      id: randomNodeId(),
      position: { x: 0, y: 0 },
      style: { opacity: 0 },
    });
    setIsSheetOpen(false);
  }

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(newOpen) => setIsSheetOpen(newOpen)}
    >
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size={"xl"}
          className="absolute text-[12px] bottom-[-9px] left-1/2 transform -translate-x-1/2 rounded-full hover:scale-150 transition duration-300 ease-in-out"
        >
          <PlusIcon className="text-white size-2" />
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
          <Button variant="outline" type="button" onClick={addIfElseCondition}>
            If/Else Condition
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
