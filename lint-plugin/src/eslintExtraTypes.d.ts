import { Program, Token } from "typescript";

declare module "eslint/use-at-your-own-risk" {
    export class FileEnumerator {
        constructor(options: {
            cwd?: string;
            extensions?: string[];
            globInputPaths?: boolean;
            errorOnUnmatchedPattern?: boolean;
            ignore?: boolean;
        });
        public iterateFiles: (source: string | string[]) => Array<EslintFile>;
    }

    export type EslintFile = {
        filePath: string;
        ignored: boolean;
    };
    export type FilePath = {
        ignored: boolean;
        filename: string;
    };
}

