import * as fs from 'fs';
import * as path from 'path';

// Get current directory

// Base path for algorithms
const ALGORITHMS_PATH = path.join(process.cwd(), './algorithms');

// Function to process a single algorithm folder
async function processAlgorithmFolder(algorithmPath: string) {
  console.log(`Processing: ${algorithmPath}`);

  // Step 1: Update index.json by removing 'files' and 'description' fields
  const indexJsonPath = path.join(algorithmPath, 'index.json');

  try {
    if (fs.existsSync(indexJsonPath)) {
      const indexData = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));

      // Remove the fields
      delete indexData.files;
      delete indexData.description;

      // Write back the updated JSON
      fs.writeFileSync(
        indexJsonPath,
        JSON.stringify(indexData, null, 2),
        'utf8',
      );
      console.log(`  Updated index.json`);
    } else {
      console.log(`  Warning: index.json not found in ${algorithmPath}`);
    }

    // Step 2: Create 'languages' subdirectory
    const languagesDir = path.join(algorithmPath, 'languages');
    if (!fs.existsSync(languagesDir)) {
      fs.mkdirSync(languagesDir);
      console.log(`  Created 'languages' directory`);
    }

    // Step 3: Move all subdirectories (except 'languages') to 'languages'
    const items = fs.readdirSync(algorithmPath);

    for (const item of items) {
      const itemPath = path.join(algorithmPath, item);

      // Skip if it's not a directory, or if it's the 'languages' directory itself
      if (!fs.statSync(itemPath).isDirectory() || item === 'languages') {
        continue;
      }

      // Skip common system directories or files that should be ignored
      if (['.git', 'node_modules', 'lessons', '.DS_Store'].includes(item)) {
        continue;
      }

      // Move the directory
      const newPath = path.join(languagesDir, item);
      fs.renameSync(itemPath, newPath);
      console.log(`  Moved ${item} to languages/`);
    }
  } catch (error) {
    console.error(`  Error processing ${algorithmPath}:`, error);
  }
}

// Main function to process all algorithm folders
async function updateAllAlgorithms() {
  console.log('Starting update process...');

  try {
    // Get all algorithm directories
    const algorithms = fs.readdirSync(ALGORITHMS_PATH).filter((item) => {
      const itemPath = path.join(ALGORITHMS_PATH, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });

    console.log(`Found ${algorithms.length} algorithm directories`);

    // Process each algorithm
    for (const algorithm of algorithms) {
      const algorithmPath = path.join(ALGORITHMS_PATH, algorithm);
      await processAlgorithmFolder(algorithmPath);
    }

    console.log('Update process completed successfully!');
  } catch (error) {
    console.error('Error during update process:', error);
  }
}

// Run the update
updateAllAlgorithms();
