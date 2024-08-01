import { useCallback, useState } from "react";
import { trpcClient } from "./trpc";

export function usePickDirectory(message: string) {
  const [selectedDirectory, setSelectedDirectory] = useState<{
    directory: string;
  } | null>(null);

  const chooseDirectory = useCallback(async () => {
    const selectDirectory = await trpcClient._directory.open.mutate({
      message: message,
    });

    if (!selectDirectory.ok) {
      alert(selectDirectory.error);
      return;
    }

    setSelectedDirectory({ directory: selectDirectory.data });
  }, [message]);

  return [selectedDirectory, chooseDirectory] as const;
}

export type SelectedDirectory = ReturnType<typeof usePickDirectory>[0];
