import * as fs from 'fs';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

/**
 * Resolves a file path by checking if it exists with any of the common TypeScript/JavaScript extensions.
 * If no file is found with any extension, returns the path with .ts extension as fallback.
 * If the path already ends with a valid extension, returns it as is.
 * @param basePath The path to resolve
 * @returns The resolved path with the correct extension
 */
export function resolveFileExtension(basePath: string): string {
  // Check if the path already ends with a valid extension
  if (EXTENSIONS.some(ext => basePath.endsWith(ext))) {
    return basePath;
  }

  // Try to find the file with any of the extensions
  for (const ext of EXTENSIONS) {
    const fullPath = `${basePath}${ext}`;
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  // If no file found with any extension, return with .ts as fallback
  return `${basePath}.ts`;
}
