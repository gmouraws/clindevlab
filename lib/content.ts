import fs from 'node:fs';
import path from 'node:path';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { articleSchema } from './schema';

type ContentNode = { type: string; url?: string; children?: ContentNode[] };
export function restrictMdx() {
  return (tree: ContentNode) => {
    const visit = (node: ContentNode) => {
      if (
        node.type.startsWith('mdx') ||
        node.type === 'html' ||
        node.type === 'image' ||
        node.type === 'imageReference'
      )
        throw new Error(`Disallowed MDX syntax: ${node.type}`);
      if (
        node.url &&
        !(node.url.startsWith('/') && !node.url.startsWith('//')) &&
        !node.url.startsWith('#') &&
        !node.url.startsWith('https://')
      )
        throw new Error('Unsafe content URL');
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
export function readArticles() {
  return fs
    .readdirSync(path.join(process.cwd(), 'content/learn'))
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const source = fs
        .readFileSync(path.join(process.cwd(), 'content/learn', file), 'utf8')
        .replaceAll('\r\n', '\n');
      const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) throw new Error(`Missing JSON front matter: ${file}`);
      return { ...articleSchema.parse(JSON.parse(match[1])), body: match[2] };
    })
    .sort((a, b) => a.order - b.order);
}
export async function renderArticle(body: string) {
  const { default: Content } = await evaluate(body, {
    ...runtime,
    remarkPlugins: [restrictMdx],
  });
  return Content;
}
