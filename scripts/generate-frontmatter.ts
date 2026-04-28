#!/usr/bin/env bun

import { articleSchema } from '../src/schemas/article';
import { bookSchema } from '../src/schemas/book';
import { gameSchema } from '../src/schemas/game';
import { projectSchema } from '../src/schemas/project';

const schemas: Record<string, any> = {
  articles: articleSchema,
  books: bookSchema,
  games: gameSchema,
  projects: projectSchema,
};

interface FieldInfo {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: any;
  enumValues?: string[];
}

function getFieldsFromSchema(schema: any): FieldInfo[] {
  const fields: FieldInfo[] = [];
  const shape = schema.shape;

  for (const [name, zodType] of Object.entries(shape)) {
    const field = analyzeZodType(name, zodType as any);
    fields.push(field);
  }

  return fields;
}

function analyzeZodType(name: string, zodType: any): FieldInfo {
  let optional = false;
  let defaultValue: any = undefined;
  let currentType = zodType;

  // Walk through the type definition
  while (currentType && currentType._def) {
    const def = currentType._def;
    const typeName = def.type;

    if (typeName === 'optional') {
      optional = true;
      currentType = def.innerType;
      continue;
    }

    if (typeName === 'default') {
      try {
        defaultValue = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue;
      } catch {
        defaultValue = undefined;
      }
      currentType = def.innerType;
      continue;
    }

    break;
  }

  // Determine the actual type
  let type = 'string';
  const finalDef = currentType?._def;

  if (finalDef) {
    switch (finalDef.type) {
      case 'string':
        type = 'string';
        break;
      case 'number':
        type = 'number';
        break;
      case 'boolean':
        type = 'boolean';
        break;
      case 'array':
        type = 'array';
        break;
      case 'enum':
        type = 'enum';
        break;
      case 'date':
        type = 'date';
        break;
      default:
        type = 'string';
    }
  }

  const field: FieldInfo = { name, type, optional, defaultValue };

  // Get enum values if applicable
  if (type === 'enum' && finalDef?.entries) {
    field.enumValues = Object.values(finalDef.entries) as string[];
  }

  return field;
}

function getDefaultValue(field: FieldInfo, title?: string): any {
  // Handle title/name fields
  if ((field.name === 'title' || field.name === 'name') && title) {
    return title;
  }

  // Handle fields with defaults
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  // Handle optional fields
  if (field.optional) {
    switch (field.type) {
      case 'string':
      case 'date':
        return null;
      case 'number':
        return null;
      case 'array':
        return [];
      case 'enum':
        return null;
    }
  }

  // Generate values based on type for required fields
  switch (field.type) {
    case 'string':
      if (field.name === 'title' || field.name === 'name') return 'TODO: Title';
      if (field.name === 'description') return 'TODO: Description';
      if (field.name === 'author') return 'TODO: Author';
      return 'TODO';
    case 'date':
      return new Date().toISOString().split('T')[0];
    case 'boolean':
      return false;
    case 'number':
      return null;
    case 'enum':
      return field.enumValues ? field.enumValues[0] : null;
    case 'array':
      return [];
    default:
      return null;
  }
}

function toYamlValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'null';
  if (typeof value === 'boolean') return value.toString();
  if (typeof value === 'number') return value.toString();
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return '\n  - ' + value.join('\n  - ');
  }
  return `"${value}"`;
}

function generateFrontmatter(collection: string, title?: string): string {
  const schema = schemas[collection];
  if (!schema) {
    throw new Error(`Unknown collection: ${collection}`);
  }

  const fields = getFieldsFromSchema(schema);
  let yaml = '---\n';

  for (const field of fields) {
    const value = getDefaultValue(field, title);
    yaml += `${field.name}: ${toYamlValue(value)}\n`;
  }

  yaml += '---\n';
  return yaml;
}

// CLI usage
const [, , collection, title] = process.argv;

if (!collection) {
  console.error('Usage: bun scripts/generate-frontmatter.ts <collection> [title]');
  process.exit(1);
}

console.log(generateFrontmatter(collection, title));
