import path from 'node:path';
import { createBuilder } from '@content-collections/core';

const configPath = path.resolve(process.cwd(), 'content-collections.ts');

try {
  const builder = await createBuilder(configPath);
  await builder.build();
} catch (error) {
  console.error('Failed to generate content collections.');
  throw error;
}
