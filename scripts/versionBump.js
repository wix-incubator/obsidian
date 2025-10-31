#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Package paths to update
const PACKAGE_PATHS = [
  'packages/react-obsidian/package.json',
  'packages/eslint-plugin-obsidian/package.json',
  'packages/ts-morph-extensions/package.json',
  'packages/swc-plugin-obsidian/package.json'
];

const CARGO_PATH = 'packages/swc-plugin-obsidian/Cargo.toml';
const SOURCE_PACKAGE = 'packages/react-obsidian/package.json';

// Package names that should be updated in dependencies
const PACKAGE_NAMES = [
  'react-obsidian',
  'eslint-plugin-obsidian',
  'ts-morph-extensions',
  'swc-plugin-obsidian'
];

/**
 * Display usage information
 */
function showHelp() {
  console.log(`
Usage: node scripts/versionBump.js [--major|--minor|--patch] [--alpha]

Options:
  --major   Bump major version (e.g., 2.24.0 → 3.0.0)
  --minor   Bump minor version (e.g., 2.24.0 → 2.25.0)
  --patch   Bump patch version (e.g., 2.24.0 → 2.24.1)
  --alpha   Add or increment alpha prerelease tag

Examples:
  node scripts/versionBump.js --patch --alpha    # 2.24.0-alpha.5 → 2.24.0-alpha.6
  node scripts/versionBump.js --minor --alpha    # 2.24.0 → 2.25.0-alpha.0
  node scripts/versionBump.js --patch            # 2.24.0-alpha.5 → 2.24.1
  node scripts/versionBump.js --major            # 2.24.0 → 3.0.0
  `);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  
  // Check for help flag
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }
  
  const flags = {
    major: args.includes('--major'),
    minor: args.includes('--minor'),
    patch: args.includes('--patch'),
    alpha: args.includes('--alpha')
  };

  // Validate that exactly one of major, minor, or patch is provided
  const bumpTypes = [flags.major, flags.minor, flags.patch].filter(Boolean).length;
  if (bumpTypes !== 1) {
    console.error('Error: You must specify exactly one of --major, --minor, or --patch');
    showHelp();
    process.exit(1);
  }

  return flags;
}

/**
 * Parse version string into components
 */
function parseVersion(versionString) {
  const match = versionString.match(/^(\d+)\.(\d+)\.(\d+)(?:-alpha\.(\d+))?$/);
  if (!match) {
    throw new Error(`Invalid version format: ${versionString}`);
  }

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    alpha: match[4] !== undefined ? parseInt(match[4], 10) : null
  };
}

/**
 * Calculate new version based on bump type and flags
 */
function calculateNewVersion(currentVersion, flags) {
  const version = parseVersion(currentVersion);

  if (flags.alpha) {
    // Alpha flag is set
    if (version.alpha !== null) {
      // Current version has alpha tag - increment alpha number
      return `${version.major}.${version.minor}.${version.patch}-alpha.${version.alpha + 1}`;
    } else {
      // Current version has no alpha tag - bump minor and add alpha.0
      return `${version.major}.${version.minor + 1}.0-alpha.0`;
    }
  } else {
    // No alpha flag - standard semver bump, remove any alpha tag
    if (flags.major) {
      return `${version.major + 1}.0.0`;
    } else if (flags.minor) {
      return `${version.major}.${version.minor + 1}.0`;
    } else if (flags.patch) {
      return `${version.major}.${version.minor}.${version.patch + 1}`;
    }
  }
}

/**
 * Read and parse JSON file
 */
function readJsonFile(filePath) {
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  return JSON.parse(content);
}

/**
 * Write JSON file with pretty formatting
 */
function writeJsonFile(filePath, data) {
  const absolutePath = path.join(process.cwd(), filePath);
  const content = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(absolutePath, content, 'utf8');
}

/**
 * Update version in package.json file
 */
function updatePackageVersion(filePath, newVersion) {
  const pkg = readJsonFile(filePath);
  const oldVersion = pkg.version;
  pkg.version = newVersion;
  writeJsonFile(filePath, pkg);
  return oldVersion;
}

/**
 * Update dependencies in a package.json file
 */
function updateDependencies(filePath, oldVersion, newVersion) {
  const pkg = readJsonFile(filePath);
  let updated = false;

  const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies'];
  
  for (const depType of dependencyTypes) {
    if (pkg[depType]) {
      for (const packageName of PACKAGE_NAMES) {
        if (pkg[depType][packageName] && pkg[depType][packageName] !== 'workspace:*') {
          // Update explicit version references
          const currentDep = pkg[depType][packageName];
          if (currentDep.includes(oldVersion)) {
            pkg[depType][packageName] = currentDep.replace(oldVersion, newVersion);
            updated = true;
          }
        }
      }
    }
  }

  if (updated) {
    writeJsonFile(filePath, pkg);
  }

  return updated;
}

/**
 * Update version in Cargo.toml
 */
function updateCargoToml(filePath, newVersion) {
  const absolutePath = path.join(process.cwd(), filePath);
  let content = fs.readFileSync(absolutePath, 'utf8');
  
  // Replace version in [package] section
  const versionRegex = /^(\[package\][\s\S]*?version\s*=\s*")([^"]+)(")/m;
  const match = content.match(versionRegex);
  
  if (!match) {
    throw new Error('Could not find version in Cargo.toml');
  }
  
  const oldVersion = match[2];
  content = content.replace(versionRegex, `$1${newVersion}$3`);
  fs.writeFileSync(absolutePath, content, 'utf8');
  
  return oldVersion;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('🚀 Version Bump Script\n');

    // Parse arguments
    const flags = parseArgs();
    const bumpType = flags.major ? 'major' : flags.minor ? 'minor' : 'patch';
    console.log(`Bump type: ${bumpType}${flags.alpha ? ' (with alpha tag)' : ''}\n`);

    // Read current version
    const sourcePackage = readJsonFile(SOURCE_PACKAGE);
    const currentVersion = sourcePackage.version;
    console.log(`Current version: ${currentVersion}`);

    // Calculate new version
    const newVersion = calculateNewVersion(currentVersion, flags);
    console.log(`New version: ${newVersion}\n`);

    // Update package.json files
    console.log('Updating package.json files:');
    for (const packagePath of PACKAGE_PATHS) {
      const oldVer = updatePackageVersion(packagePath, newVersion);
      console.log(`  ✓ ${packagePath} (${oldVer} → ${newVersion})`);
    }

    // Update Cargo.toml
    console.log('\nUpdating Cargo.toml:');
    const cargoOldVer = updateCargoToml(CARGO_PATH, newVersion);
    console.log(`  ✓ ${CARGO_PATH} (${cargoOldVer} → ${newVersion})`);

    // Update dependencies
    console.log('\nUpdating inter-package dependencies:');
    let dependenciesUpdated = false;
    for (const packagePath of PACKAGE_PATHS) {
      const updated = updateDependencies(packagePath, currentVersion, newVersion);
      if (updated) {
        console.log(`  ✓ ${packagePath}`);
        dependenciesUpdated = true;
      }
    }
    if (!dependenciesUpdated) {
      console.log('  (No dependency updates needed)');
    }

    console.log('\n✅ Version bump completed successfully!');
    console.log(`\nAll packages updated from ${currentVersion} to ${newVersion}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

