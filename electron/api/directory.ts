import { dialog } from "electron";
import { procedure, router } from "./trpc";
import { z } from "zod";
import { KNOWN_ERRORS } from "../../common/errors";

export const directoryRouter = router({
  open: procedure
    .input(z.object({ message: z.string() }))
    .mutation(async (opts) => {
      const { message } = opts.input;

      const selectedDirectory = await dialog.showOpenDialog({
        properties: ["openDirectory", "createDirectory"],
        message: message,
      });

      if (
        selectedDirectory.canceled ||
        selectedDirectory.filePaths.length === 0
      ) {
        return {
          ok: false,
          error: KNOWN_ERRORS.NO_DIRECTORY_SELECTED,
        } as const;
      }

      return { ok: true, data: selectedDirectory.filePaths[0] } as const;
    }),
});
