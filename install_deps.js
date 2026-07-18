const { execSync } = require('child_process');
try {
  console.log('Installing Three.js packages...');
  execSync('npm install three @types/three @react-three/fiber @react-three/drei', { stdio: 'inherit' });
  console.log('Installation complete.');
} catch (error) {
  console.error('Failed to install:', error);
}
