import { writeFile } from "fs/promises";
import path from "path";

export class CodeFile {
  #sourceCode: string;
  #path: string;

  constructor({ path, sourceCode }: { sourceCode: string; path: string }) {
    this.#sourceCode = sourceCode;
    this.#path = path;
  }

  async write(cwd: string) {
    const filePath = path.resolve(cwd, this.#path);

    await writeFile(filePath, this.#sourceCode);
  }

  log() {
    console.group(this.#path);

    console.log(this.#sourceCode);

    console.groupEnd();
  }
}

export class CodeGenProject {
  #files: CodeFile[];

  constructor(files: CodeFile[]) {
    this.#files = files;
  }

  async write(cwd: string) {
    await Promise.all(this.#files.map((codeFile) => codeFile.write(cwd)));
  }

  log() {
    for (const file of this.#files) {
      file.log();
    }
  }
}
