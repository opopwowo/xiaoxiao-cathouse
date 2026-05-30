import indexHtml from '../index.html';
import privacyHtml from '../privacy.html';
import termsHtml from '../terms.html';
import llmsTxt from '../llms.txt';
import robotsTxt from '../robots.txt';
import sitemapXml from '../sitemap.xml';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/privacy.html' || path === '/privacy') {
      return new Response(privacyHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    if (path === '/terms.html' || path === '/terms') {
      return new Response(termsHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    if (path === '/llms.txt') {
      return new Response(llmsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (path === '/robots.txt') {
      return new Response(robotsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (path === '/sitemap.xml') {
      return new Response(sitemapXml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
    }

    return new Response(indexHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  },
};
