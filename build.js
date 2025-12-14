const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const talksData = fs.readFileSync(path.join(__dirname, 'talks.json'), 'utf-8');
const style = fs.readFileSync(path.join(__dirname, 'src', 'style.css'), 'utf-8');
const script = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf-8');
let html = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf-8');

html = html.replace('{{TALKS_DATA}}', talksData);
html = html.replace('{{STYLES}}', style);
html = html.replace('{{SCRIPT}}', script);

fs.writeFileSync(path.join(distPath, 'index.html'), html);

console.log('Website built successfully! You can find it in the "dist" folder.');
