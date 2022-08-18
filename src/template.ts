/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

export { buildVitePHPClass };
