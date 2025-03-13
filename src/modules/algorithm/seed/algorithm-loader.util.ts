import * as path from 'path';
import * as fs from 'fs';
import * as matter from 'gray-matter';
import {
  AlgorithmFile,
  AlgorithmTemplate,
  AlgorithmFileType,
  CodeLanguage,
  AlgorithmLesson,
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

          // Load files from languages directory
          const files = loadAlgorithmFiles(algorithmPath);

          // Load lessons from lessons directory
          const lessons = loadLessons(algorithmPath);

          return {
            ...meta,
            categories: meta.categories || [],
            tags: meta.tags || [],
            lessons,
            level: meta.level,
            files,
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

const loadAlgorithmFiles = (algorithmPath: string): AlgorithmFile[] => {
  const languagesPath = path.join(algorithmPath, 'languages');

  if (!fs.existsSync(languagesPath)) {
    console.warn(`Languages directory not found at: ${languagesPath}`);
    return [];
  }

  const languageDirs = fs.readdirSync(languagesPath);
  const files: AlgorithmFile[] = [];

  languageDirs.forEach((languageDir) => {
    const langPath = path.join(languagesPath, languageDir);

    if (!fs.statSync(langPath).isDirectory()) {
      return;
    }

    // Map folder name to CodeLanguage enum
    let language: CodeLanguage;
    switch (languageDir.toLowerCase()) {
      case 'typescript':
        language = CodeLanguage.TYPESCRIPT;
        break;
      case 'javascript':
        language = CodeLanguage.JAVASCRIPT;
        break;
      case 'python':
        language = CodeLanguage.PYTHON;
        break;
      case 'go':
        language = CodeLanguage.GO;
        break;
      case 'java':
        language = CodeLanguage.JAVA;
        break;
      case 'cpp':
        language = CodeLanguage.CPP;
        break;
      default:
        console.warn(`Unsupported language directory: ${languageDir}`);
        return;
    }

    const langFiles = fs.readdirSync(langPath);

    langFiles.forEach((file) => {
      const filePath = path.join(langPath, file);

      if (!fs.statSync(filePath).isFile()) {
        return;
      }

      // Determine file type and extension
      const fileName = path.parse(file).name;
      const extension = path.parse(file).ext.substring(1); // Remove the dot

      let fileType: AlgorithmFileType;
      if (fileName.includes('exercise')) {
        fileType = AlgorithmFileType.EXERCISE;
      } else if (fileName.includes('solution')) {
        fileType = AlgorithmFileType.SOLUTION;
      } else if (fileName.includes('test')) {
        fileType = AlgorithmFileType.TEST;
      } else {
        fileType = AlgorithmFileType.EXERCISE;
      }

      // Read file content
      const content = fs.readFileSync(filePath, 'utf-8');

      // Determine if file should be read-only or hidden
      const readOnly = fileType === AlgorithmFileType.SOLUTION;
      const hidden = fileType === AlgorithmFileType.SOLUTION;

      files.push({
        id: uuidv4(),
        name: fileName,
        type: fileType,
        content,
        language,
        extension,
        readOnly,
        hidden,
      });
    });
  });

  return files;
};

const loadLessons = (algorithmPath: string): AlgorithmLesson[] => {
  const lessonsPath = path.join(algorithmPath, 'lessons');

  if (!fs.existsSync(lessonsPath)) {
    console.warn(`Lessons directory not found at: ${lessonsPath}`);
    return [];
  }

  const lessonFiles = fs.readdirSync(lessonsPath);

  // Sort lessons by the numerical prefix in their filename
  const sortedLessonFiles = lessonFiles.sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)_/)?.[1] || '0', 10);
    const numB = parseInt(b.match(/^(\d+)_/)?.[1] || '0', 10);
    return numA - numB;
  });

  return sortedLessonFiles
    .map((lessonFile) => {
      const lessonPath = path.join(lessonsPath, lessonFile);

      if (!fs.statSync(lessonPath).isFile()) {
        return null;
      }

      try {
        const fileContent = fs.readFileSync(lessonPath, 'utf-8');
        const parsedLesson = matter(fileContent);
        const { content, data } = parsedLesson;

        // Use the title from frontmatter or generate from filename if not available
        const title =
          data.title ||
          lessonFile
            .replace(/^\d+_/, '') // Remove number prefix
            .replace(/\.md$/, '') // Remove extension
            .replace(/_/g, ' ') // Replace underscores with spaces
            .split(' ') // Split into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
            .join(' '); // Join words back together

        return {
          id: uuidv4(),
          title,
          content,
        };
      } catch (error) {
        console.error(`Error loading lesson ${lessonFile}:`, error);
        return null;
      }
    })
    .filter(Boolean) as AlgorithmLesson[];
};
