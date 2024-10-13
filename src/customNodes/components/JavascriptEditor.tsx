import { Editor } from "@monaco-editor/react";
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
