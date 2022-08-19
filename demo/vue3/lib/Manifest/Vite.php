<?php

namespace OCA\TimerApp\Manifest;

class Vite {
    protected static $MANIFEST = [
    'src/main.ts' => [
        'file' => 'assets/main.41db873a.js',
        'preloads' => ['assets/vendor.04fbe408.js'],
        'css' => ['assets/main.5cec41d6.css']
    ]
];

    public static function manifest(string $name): array
    {
        return self::$MANIFEST[$name];
    }
}
