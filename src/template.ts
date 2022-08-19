/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { writeFile as fsWriteFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path'
import { Entry } from './manifest';
// @ts-expect-error
import jsPhpData from 'js-php-data';

const buildVitePHPClass = (
  namespace: string,
  entries: Record<string, Entry>
): string => `<?php

namespace ${namespace}\\Manifest;

class Vite {
    protected static $MANIFEST = ${jsPhpData(entries)};

    public static function manifest(string $name): array
    {
        return self::$MANIFEST[$name];
    }
}
`;

const writeFile = async (file: string, content: string): Promise<void> => {
  await mkdir(dirname(file), { recursive: true });
  await fsWriteFile(file, content, { encoding: 'utf-8' })
}

export { buildVitePHPClass, writeFile };
