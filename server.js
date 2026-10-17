Bun.serve({
  port: 8080,
  fetch(req) {
    let url = new URL(req.url).pathname;
    if (url === '/') url = '/index.html';
    const filePath = 'C:/Kalakritico' + decodeURIComponent(url);
    const file = Bun.file(filePath);
    return new Response(file);
  },
});
console.log('Static server running at http://localhost:8080');
