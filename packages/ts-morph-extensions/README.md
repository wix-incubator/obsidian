# ts-morph-extensions
Extensions and utilities for analyzing and traversing ASTs with ts-morph, specifically for Obsidian dependency injection patterns.

## Overview
This package provides utilities for analyzing Obsidian-specific code patterns (Graphs, Providers, decorators) and a simple interface for managing ts-morph projects with automatic TypeScript configuration discovery and caching.

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
  logger: myCustomLogger, // Useful for debugging
  overrideTsConfigPath: '/path/to/custom/tsconfig.json' // Useful for testing
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

## Dependencies
- `ts-morph` (peer dependency): For TypeScript project management
- `jsonc-parser`: For parsing JSON with comments (tsconfig.json files)

## License
ISC
