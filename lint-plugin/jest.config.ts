import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    moduleFileExtensions: ["ts", "js", "json"],
    silent: false,
    verbose: true,
};

export default config;
