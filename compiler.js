const sass = require('sass')
const fs = require('fs')

// Reset/Create folder(s)
fs.mkdirSync('dist/fonts', { recursive: true });

// Compile css
compile('src/style.scss', 'dist/style.css')
compile('src/style.scss', 'dist/style.min.css', 'compressed')

// Copy fonts
fs.copyFileSync('src/fonts/fontello.woff', 'dist/fonts/fontello.woff')
fs.copyFileSync('src/fonts/fontello.woff2', 'dist/fonts/fontello.woff2')

/**
 * Compile SCSS
 * @param {string} file input path
 * @param {string} output output path
 * @param {'expanded'|'compressed'} outputStyle
 */

function compile(file, output, outputStyle = 'expanded') {
	sass.render({ file, outputStyle }, (err, result) => {
		if (err) {
			console.error(`Fehler beim Kompilieren von ${file}: ${err}`)
		} else {
			fs.writeFileSync(output, result.css)
			console.log(`Erfolgreich kompiliert: ${file} -> ${output}`)
		}
	})
}