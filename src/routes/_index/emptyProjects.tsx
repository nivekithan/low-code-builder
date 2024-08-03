import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, Label } from "@/components/ui/fieldset";
import { SelectedDirectory, usePickDirectory } from "@/lib/directory";
import { useId } from "react";
import { Form } from "react-router-dom";
import { FORM_ACTIONS } from "./constant";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function EmptyProjects() {
  const nameFieldId = useId();

  const [selectedDirectory, promptToSelectDirectory] = usePickDirectory(
    "Select a directory to create your project"
  );

  return (
    <div className="min-h-screen grid place-items-center">
      <Card>
        <CardHeader>
          <Heading>Create your first project</Heading>
          <Text>
            Choose the directory where you want to create your project.
          </Text>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="flex flex-col gap-y-4">
            <Field>
              <Label htmlFor={nameFieldId}>Name:</Label>
              <Input type="text" name="name" id={nameFieldId} required />
            </Field>
            <Field>
              <Label>Directory:</Label>
              <DirectorySelection
                selectedDirectory={selectedDirectory}
                promptToSelectDirectory={promptToSelectDirectory}
              />
            </Field>
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
      <Button
        type="button"
        onClick={promptToSelectDirectory}
        className="w-full"
        data-slot="control"
      >
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
        onClick={promptToSelectDirectory}
        outline
        className="w-full"
        data-slot="description"
      >
        Change Directory
      </Button>
    </>
  );
}
