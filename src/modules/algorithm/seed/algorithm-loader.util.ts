import * as path from 'path';
import * as fs from 'fs';
import {
  AlgorithmFile,
  AlgorithmTemplate,
} from '../interfaces/algorithm.interface';
import { v4 as uuidv4 } from 'uuid';

export const loadAlgorithmTemplates = (): AlgorithmTemplate[] => {
  try {
    // Handle both development and production paths
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseDir = isDevelopment
      ? process.cwd()
      : path.dirname(require.main?.filename || process.cwd());

    const algorithmsPath = path.join(
      baseDir,
      isDevelopment ? 'src' : 'dist/src',
      'modules',
      'algorithm',
      'seed',
      'algorithms',
    );

    console.log('Loading algorithms from:', algorithmsPath);

    // Ensure the algorithms directory exists
    if (!fs.existsSync(algorithmsPath)) {
      console.warn('Algorithms directory not found:', algorithmsPath);
      return [];
    }

    const algorithmDirs = fs.readdirSync(algorithmsPath);
    console.log('Found algorithm directories:', algorithmDirs);

    return algorithmDirs
      .map((algorithmDir) => {
        const algorithmPath = path.join(algorithmsPath, algorithmDir);

        // Skip if not a directory
        if (
          !fs.existsSync(algorithmPath) ||
          !fs.statSync(algorithmPath).isDirectory()
        ) {
          console.warn(`Skipping ${algorithmDir}: not a directory`);
          return null;
        }

        const indexFile = path.join(algorithmPath, 'index.json');

        if (!fs.existsSync(indexFile)) {
          console.warn(
            `Missing index file in algorithm directory: ${algorithmDir}`,
          );
          return null;
        }

        try {
          const meta = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));

          // Validate required fields
          if (!meta.id || !meta.title || !meta.difficulty) {
            console.warn(
              `Missing required fields in algorithm ${algorithmDir}`,
            );
            return null;
          }

          const descriptionPath = path.join(algorithmPath, meta.description);
          const descriptionFile = fs.readFileSync(descriptionPath, 'utf-8');
          if (!descriptionFile) {
            console.warn(
              `Missing description in algorithm directory: ${algorithmDir}`,
            );
            return null;
          }

          return {
            ...meta,
            description: undefined,
            categories: meta.categories || [],
            tags: meta.tags || [],
            lessons: [
              {
                id: uuidv4(),
                title: 'Description',
                content: descriptionFile,
              },
            ],
            level: meta.level,
            files: meta.files.map((file: AlgorithmFile) => {
              const filePath = path.join(algorithmPath, file.content);

              if (!fs.existsSync(filePath)) {
                console.warn(`File not found: ${filePath}`);
                throw new Error(`File not found: ${filePath}`);
              }

              return {
                ...file,
                content: fs.readFileSync(filePath, 'utf-8'),
              };
            }),
            createdAt: meta.createdAt || new Date(),
            updatedAt: meta.updatedAt || new Date(),
          } as AlgorithmTemplate;
        } catch (error) {
          console.error(`Error loading algorithm ${algorithmDir}:`, error);
          return null;
        }
      })
      .filter(Boolean) as AlgorithmTemplate[];
  } catch (error) {
    console.error('Error loading algorithm templates:', error);
    return [];
  }
};
