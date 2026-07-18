const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\HP\\Downloads\\هل_تقدر_تسوي_مقطع_انميشن_يخلي.mp4';
const dest = path.join(__dirname, 'public', 'perfume-video.mp4');

fs.copyFileSync(src, dest);
console.log('Copied successfully!');
