# ts-morph-extensions
Extensions and utilities for working with ts-morph projects and TypeScript configurations.

## Overview
This package provides a simple interface for managing ts-morph projects with automatic TypeScript configuration discovery and caching.

## Usage
### ProjectRegistry
Manages ts-morph `Project` instances with automatic tsconfig.json discovery and caching.

```typescript
import { ProjectRegistry } from 'ts-morph-extensions';

// Create a project registry (no dependencies needed!)
const projectRegistry = new ProjectRegistry();

// Get a project for a specific file path
const project = projectRegistry.get('/path/to/your/file.ts');

// Get a source file directly (convenience method)
const sourceFile = projectRegistry.getSourceFileOrThrow('/path/to/your/file.ts');

// Also accepts file:// URIs (automatically normalized)
const projectFromUri = projectRegistry.get('file:///path/to/your/file.ts');
const sourceFileFromUri = projectRegistry.getSourceFileOrThrow('file:///path/to/your/file.ts');

// Optional: provide a custom logger and other options
const projectRegistryWithOptions = new ProjectRegistry({
  logger: myCustomLogger,
  overrideTsConfigPath: '/path/to/custom/tsconfig.json'
});
```

### Features
- **Automatic tsconfig discovery**: Finds the closest tsconfig.json for any file
- **Project caching**: Reuses projects for files in the same TypeScript configuration
- **Flexible configuration**: Support for `extends`, composite projects, and path mappings

## Installation
```bash
npm install ts-morph-extensions ts-morph
```

Note: `ts-morph` is a peer dependency and must be installed alongside this package.

## Dependencies
- `ts-morph` (peer dependency): For TypeScript project management
- `jsonc-parser`: For parsing JSON with comments (tsconfig.json files)

## License
ISC
