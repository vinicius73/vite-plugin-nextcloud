import { Manifest, ManifestChunk } from 'vite';

export interface Entry {
  file: string;
  preloads: string[];
  css: string[];
}

const isEntry = (entry: ManifestChunk): boolean => entry.isEntry === true;

const getRecursiveImports = (
  manifest: Manifest,
  root: string,
  cache: Map<string, string> = new Map()
): Map<string, string> => {
  const current = manifest[root];

  if (!isEntry(current)) {
    cache.set(current.src ?? current.file, current.file);
  }

  const files = [
    ...(current.imports ?? []),
    ...(current.dynamicImports ?? []),
  ].filter(name => {
    return !cache.has(name) && !isEntry(manifest[name]);
  });

  files.forEach(name => {
    cache = getRecursiveImports(manifest, name, cache);
  });

  return cache;
};

const getRecursiveCSS = (manifest: Manifest, root: string): string[] => {
  const entry = manifest[root];

  const files = entry.dynamicImports ?? [];

  const entries: string[] = files.flatMap(name => {
    return getRecursiveCSS(manifest, name);
  });

  return entry.css != null ? [...entry.css, ...entries] : entries;
};

const buildEntries = (raw: Manifest): Record<string, Entry> => {
  return Object.entries(raw)
    .filter(([_, value]) => value.isEntry)
    .reduce<Record<string, Entry>>((acc, [key, value]) => {
      acc[key] = {
        file: value.file,
        preloads: [...getRecursiveImports(raw, key).values()],
        // TODO: remove duplicateds
        css: getRecursiveCSS(raw, key),
      };
      return acc;
    }, {});
};

export { getRecursiveCSS, buildEntries, getRecursiveImports };
