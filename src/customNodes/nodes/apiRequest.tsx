import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { GetNodeComponent } from "common/types";
import { Field, Fieldset } from "@/components/ui/fieldset";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { produce } from "immer";

type ApiRequestNode = GetNodeComponent<"apiRequest">;

type UpdateNodeData = (data: Partial<ApiRequestNode["data"]>) => void;

type MethodType = ApiRequestNode["data"]["method"];

const methods: MethodType[] = ["GET", "POST", "PUT", "DELETE"];

export function ApiRequestNode({ data, id }: NodeProps<ApiRequestNode>) {
  const reactflow = useReactFlow();

  function updateNodeData(data: Partial<ApiRequestNode["data"]>) {
    reactflow.updateNodeData(id, data);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>API Request</CardTitle>
          <CardDescription>
            Choose the method which the client can use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Fieldset>
            <SelectMethod data={data} updateNodeData={updateNodeData} />
            <DefineHeaders data={data} updateNodeData={updateNodeData} />
          </Fieldset>
        </CardContent>
        <Handle type="source" position={Position.Bottom} />
      </Card>
    </>
  );
}

function DefineHeaders({
  data,
  updateNodeData,
}: {
  data: ApiRequestNode["data"];
  updateNodeData: UpdateNodeData;
}) {
  function updateDefinedHeader(newValue: string, index: number) {
    const newDefinedHeaders = produce(data.definedHeaders, (definedHeaders) => {
      definedHeaders[index].value = newValue;
    });
    updateNodeData({ definedHeaders: newDefinedHeaders });
  }

  function removeDefinedHeader(index: number) {
    const newDefinedHeaders = produce(data.definedHeaders, (definedHeaders) => {
      definedHeaders.splice(index, 1);
    });
    updateNodeData({ definedHeaders: newDefinedHeaders });
  }

  function addNewDefinedHeader() {
    const newDefinedHeaders = produce(data.definedHeaders, (definedHeaders) => {
      definedHeaders.push({ id: crypto.randomUUID().slice(0, 6), value: "" });
    });

    updateNodeData({ definedHeaders: newDefinedHeaders });
  }

  function removeEmptyHeaders() {
    const newDefinedHeaders = data.definedHeaders.filter(({ value }) =>
      Boolean(value)
    );

    updateNodeData({ definedHeaders: newDefinedHeaders });
  }

  return (
    <Field>
      <Label>Defined Headers:</Label>
      <Popover
        onOpenChange={(newState) => {
          const isClosing = newState === false;

          if (isClosing) {
            removeEmptyHeaders();
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button type="button" className="w-full" variant="outline">
            {data.definedHeaders.length} headers
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px]">
          <div className="flex flex-col gap-y-2">
            {data.definedHeaders.map(({ id, value: header }, i) => {
              return (
                <div className="flex gap-x-2" key={id}>
                  <Input
                    defaultValue={header}
                    onChange={(e) => updateDefinedHeader(e.target.value, i)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeDefinedHeader(i)}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="secondary"
              onClick={addNewDefinedHeader}
            >
              New
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}

function SelectMethod({
  data,
  updateNodeData,
}: {
  data: ApiRequestNode["data"];
  updateNodeData: UpdateNodeData;
}) {
  return (
    <Field>
      <Label>Method:</Label>
      <Select
        value={data.method}
        onValueChange={(newValue: MethodType) => {
          updateNodeData({ method: newValue });
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {methods.map((method) => {
            return (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Field>
  );
}
