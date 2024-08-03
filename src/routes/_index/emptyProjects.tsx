import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectedDirectory, usePickDirectory } from "@/lib/directory";
import { useId } from "react";
import { Form } from "react-router-dom";
import { FORM_ACTIONS } from "./constant";

export function EmptyProjects() {
  const nameFieldId = useId();

  const [selectedDirectory, promptToSelectDirectory] = usePickDirectory(
    "Select a directory to create your project"
  );

  return (
    <div className="min-h-screen grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create your first project</CardTitle>
          <CardDescription>
            Choose the directory where you want to create your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={nameFieldId}>Name:</Label>
              <Input type="text" name="name" id={nameFieldId} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Directory:</Label>
              <DirectorySelection
                selectedDirectory={selectedDirectory}
                promptToSelectDirectory={promptToSelectDirectory}
              />
            </div>
            {selectedDirectory ? (
              <Button
                type="submit"
                name="action"
                value={FORM_ACTIONS.CREATE_NEW_PROJECT}
              >
                Confirm
              </Button>
            ) : null}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function DirectorySelection({
  promptToSelectDirectory,
  selectedDirectory,
}: {
  selectedDirectory: SelectedDirectory;
  promptToSelectDirectory: () => void;
}) {
  if (selectedDirectory === null) {
    return (
      <Button type="button" onClick={promptToSelectDirectory}>
        Select a directory
      </Button>
    );
  }

  return (
    <>
      <Input
        type="text"
        name="directory"
        value={selectedDirectory.directory}
        readOnly
      />
      <Button
        type="button"
        variant="secondary"
        onClick={promptToSelectDirectory}
      >
        Change Directory
      </Button>
    </>
  );
}
