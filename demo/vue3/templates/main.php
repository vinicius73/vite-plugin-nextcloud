<?php foreach ($manifest['css'] as $css) { ?>
<link rel="stylesheet" href="<?= $base . '/js/' . $css ?>" />
<?php } ?>
<?php foreach ($manifest['preloads'] as $js) { ?>
    <link  rel="modulepreload" nonce="<?= $nonce ?>" href="<?= $base . '/js/' . $js ?>" />
<?php } ?>
<script type="module" crossorigin src="<?= $base . '/js/' . $manifest['file'] ?>" defer nonce="<?= $nonce ?>"></script>
<div id="app-main-content"></div>
