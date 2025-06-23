import { createServer } from 'http';
import { readFile } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 9000;
const DIST_DIR = join(__dirname, 'dist');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Parse URL
  let url = req.url;
  
  // If URL ends with /, serve index.html
  if (url.endsWith('/')) {
    url += 'index.html';
  }
  
  // Remove query parameters
  const cleanUrl = url.split('?')[0];
  
  // Handle base path for local testing
  if (cleanUrl.startsWith('/ai-fluency/')) {
    url = cleanUrl.replace('/ai-fluency/', '/');
  }
  
  // Get the file path
  const filePath = join(DIST_DIR, cleanUrl);
  
  // Get the file extension
  const ext = extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Read the file
  readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, try serving index.html for SPA routing
        readFile(join(DIST_DIR, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`
  ┌───────────────────────────────────────────────┐
  │                                               │
  │   정적 웹사이트 테스트 서버가 실행 중입니다   │
  │                                               │
  │   - 메인 페이지: http://localhost:${PORT}/       │
  │   - 테스트 페이지: http://localhost:${PORT}/static-test.html │
  │                                               │
  └───────────────────────────────────────────────┘
  `);
});