const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/import\s+{([^}]+)}\s+from\s+["'](\.\.\/)*components\/ui\/([a-zA-Z]+)["']/g, 'import { $1 } from "@/app/components/ui/$3"');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./app');
console.log("Done");
