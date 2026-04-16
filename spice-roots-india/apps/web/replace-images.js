const fs = require('fs');
const path = require('path');

const cardamomImg = 'https://images.unsplash.com/photo-1596541530932-5a21fa9ca852?auto=format&fit=crop&q=80&w=600&h=600';
const pepperImg = 'https://images.unsplash.com/photo-1620063259966-22485ebdef38?auto=format&fit=crop&q=80&w=600&h=600';

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      if (content.includes('source.unsplash.com')) {
        changed = true;
        
        // Random spice replacements
        content = content.replace(/https:\/\/source\.unsplash\.com\/random\/\d+x\d+\/\?cardamom/g, cardamomImg);
        content = content.replace(/https:\/\/source\.unsplash\.com\/random\/\d+x\d+\/\?pepper/g, pepperImg);
        content = content.replace(/https:\/\/source\.unsplash\.com\/random\/\d+x\d+\/\?pepper,spice/g, pepperImg);
        
        // Featured
        content = content.replace(/https:\/\/source\.unsplash\.com\/featured\/\?cardamom/g, cardamomImg);
        
        // Dynamic map replacements
        content = content.replace(/https:\/\/source\.unsplash\.com\/random\/400x400\/\?spices,powder,\$\{i\}/g, cardamomImg.replace('w=600', 'w=400').replace('h=600', 'h=400'));
        content = content.replace(/https:\/\/source\.unsplash\.com\/random\/200x200\/\?spice,\$\{i\}/g, cardamomImg.replace('w=600', 'w=200').replace('h=600', 'h=200'));
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

walk('./apps/web/app');
console.log("Image replacements done.");
