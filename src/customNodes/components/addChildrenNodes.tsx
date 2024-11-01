import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useInsertNodes } from "@/features/editor/insertNodes";
import { randomNodeId } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export function AddChildrenNodes({ nodeId }: { nodeId: string }) {
  const insertNodes = useInsertNodes();

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
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size={"xl"}
          className="absolute text-[12px] bottom-[-25px] left-1/2 transform -translate-x-1/2 rounded-full"
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
