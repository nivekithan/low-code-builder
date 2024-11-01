import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@monaco-editor/react";
import { LinkIcon } from "lucide-react";
import { ComponentProps } from "react";

export function JavascriptEditor(props: ComponentProps<typeof Editor>) {
  return (
    <Editor
      height="240px"
      width="420px"
      defaultLanguage="javascript"
      theme="vs-dark"
      {...props}
      options={{
        fontSize: 22,
        lineNumbers: "off",
        minimap: { enabled: false },
        ...props.options,
      }}
    />
  );
}

export function JavascriptEditorInput({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <div className="flex gap-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            className="w-full flex gap-x-2"
            variant="outline"
          >
            <LinkIcon size={14} />
            Editor
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" avoidCollisions className="p-0">
          <JavascriptEditor defaultValue={defaultValue} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
