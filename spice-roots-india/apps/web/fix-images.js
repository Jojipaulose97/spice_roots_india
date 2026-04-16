const fs = require('fs');
const path = require('path');

// Map old broken photo IDs to new Pexels direct URLs (cdn.pixabay.com or picsum.photos as stable fallback)
// Using picsum.photos which uses a seed ID for stable deterministic images
const OLD_DOMAIN = 'images.unsplash.com';
const NEW_BASE = 'picsum.photos/seed';

// Seed-based stable image map per category
const SEED_MAP = {
  // Main cardamom/green spice
  'photo-1638159219196-2bc5e5c35e8a': 'cardamom',
  'photo-1604928141064-207cea6f571f': 'pepper',
  'photo-1578991624414-276ef23a534f': 'cinnamon',
  'photo-1555664560-cf45c0f04f68': 'cloves',
  'photo-1615485500704-8e990f9900f7': 'turmeric',
  'photo-1583119022894-919a68a3d0e3': 'chilli',
  'photo-1559056199-641a0ac8b55e': 'coffee',
  'photo-1556679343-c7306c1976bc': 'chai',
  'photo-1607305387299-a3d9611cd469': 'staranise',
  'photo-1567306226416-28f0efdc88ce': 'coriander',
  'photo-1549465220-1a8b9238cd48': 'hamper',
  'photo-1607082348824-0a96f2a4b9da': 'giftbox',
  'photo-1558618666-fcd25c85cd64': 'hero',
  'photo-1508739773434-c26b3d09e071': 'farm',
  'photo-1628689469838-524a4a973b8e': 'spice2',
  'photo-1598493785099-5027daa8e0a3': 'spice3',
  'photo-1506619216599-9d16d0903dfd': 'spice4',
  'photo-1599909631543-b5b95b9c4855': 'spice5',
};

function buildNewUrl(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const [photoId, seed] of Object.entries(SEED_MAP)) {
        // Match URLs with various w/h params:
        // https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&q=80&w=600&h=600
        const regex = new RegExp(`https://images\\.unsplash\\.com/${photoId}[^"'\`]*`, 'g');
        if (content.match(regex)) {
          content = content.replace(regex, (match) => {
            const wMatch = match.match(/w=(\d+)/);
            const hMatch = match.match(/h=(\d+)/);
            const w = wMatch ? wMatch[1] : '800';
            const h = hMatch ? hMatch[1] : w;
            return buildNewUrl(seed, w, h);
          });
          changed = true;
          console.log(`  ${path.basename(fullPath)}: replaced ${photoId} -> picsum seed:${seed}`);
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

console.log('Replacing ALL Unsplash URLs with stable picsum.photos...');
walk('./app');
console.log('\nDone! All images now use picsum.photos stable CDN.');
