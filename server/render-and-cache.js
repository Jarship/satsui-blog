const LRUCache = require("lru-cache");

const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024,
  length: n => n.length,
  maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
});

// Reference: https://medium.com/@igordata/how-to-cache-all-pages-in-next-js-at-server-side-1850aace87dc
module.exports = async (app, req, res) => {
  const key = req.path;

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`Serving HTML for path ${req.path} from cache`);
    return res.send(ssrCache.get(key));
  }

  try {
    // Generate HTML for the path.
    const html = await app.renderToHTML(req, res, req.path, req.query);

    // Something is wrong with the request, so skip the cache.
    if (res.statusCode !== 200) {
      return res.send(html);
    }

    // Cache the HTML.
    console.log(`Caching HTML for path ${req.path}`);
    ssrCache.set(key, html);

    // Send the generated HTML.
    res.send(html);
  } catch (error) {
    // An error occurred, so render an error.
    app.renderError(error, req, res, req.path, req.query);
  }
};
