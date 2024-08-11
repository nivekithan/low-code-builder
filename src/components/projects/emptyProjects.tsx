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
import { Field } from "@/components/ui/fieldset";
import { SelectedDirectory, usePickDirectory } from "@/lib/directory";
import { useId } from "react";
import { z } from "zod";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc";
import { useNavigate } from "@tanstack/react-router";

const CreateProjectSchema = z.object({
  name: z.string(),
  directory: z.string(),
});

type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;

export function EmptyProjects() {
  const nameFieldId = useId();
  const [selectedDirectory, promptToSelectDirectory] = usePickDirectory(
    "Select a directory to create your project"
  );
  const { register, handleSubmit } = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const createProjectMutation = trpc.projects.create.useMutation({
    onSuccess(data) {
      trpcUtils.projects.invalidate();
      navigate({ to: `/projects/${data.id}` });
    },
  });

  const onCreateNewProject = handleSubmit(async (data) => {
    await createProjectMutation.mutate({
      name: data.name,
      path: data.directory,
    });
  });

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
          <form onSubmit={onCreateNewProject} className="flex flex-col gap-y-4">
            <Field>
              <Label htmlFor={nameFieldId}>Name:</Label>
              <Input type="text" id={nameFieldId} {...register("name")} />
            </Field>
            <Field>
              <Label>Directory:</Label>
              <DirectorySelection
                selectedDirectory={selectedDirectory}
                promptToSelectDirectory={promptToSelectDirectory}
                register={register}
              />
            </Field>
            {selectedDirectory ? (
              <Button type="submit" disabled={createProjectMutation.isLoading}>
                Confirm
              </Button>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function DirectorySelection({
  promptToSelectDirectory,
  selectedDirectory,
  register,
}: {
  selectedDirectory: SelectedDirectory;
  promptToSelectDirectory: () => void;
  register: UseFormRegister<CreateProjectSchemaType>;
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
        value={selectedDirectory.directory}
        readOnly
        {...register("directory")}
      />
      <Button
        type="button"
        onClick={promptToSelectDirectory}
        variant="outline"
        className="w-full"
      >
        Change Directory
      </Button>
    </>
  );
}
