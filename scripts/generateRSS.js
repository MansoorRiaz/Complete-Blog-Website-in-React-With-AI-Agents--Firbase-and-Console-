import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the blog posts data using dynamic import
const blogPostsModule = await import(
  path.join(__dirname, "../src/data/blogPosts.js")
);
const blogPostsData = blogPostsModule.blogPosts;

const generateRSSFeed = () => {
  const baseUrl = "https://yourdomain.com"; // Change this to your actual domain
  const currentDate = new Date().toISOString();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toUTCString();
  };

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const generateRSSItem = (post) => {
    const category =
      post.category === "evs" ? "Electric Vehicles" : "Traditional Vehicles";
    const pubDate = formatDate(post.publishDate);
    const content = escapeHtml(post.content.substring(0, 500) + "...");

    return `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid>${baseUrl}/blog/${post.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>
      <dc:creator>${escapeHtml(post.author.name)}</dc:creator>
      <description>${escapeHtml(post.description)}</description>
      <content:encoded><![CDATA[
        <p>${content}</p>
        <p>Read the full article at: <a href="${baseUrl}/blog/${
      post.id
    }">${baseUrl}/blog/${post.id}</a></p>
      ]]></content:encoded>
      <media:content url="${
        post.image
      }" medium="image" width="800" height="600"/>
    </item>`;
  };

  const rssItems = blogPostsData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(generateRSSItem)
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>EV Smarts - Electric Vehicle &amp; Automotive Blog</title>
    <link>${baseUrl}/</link>
    <description>Your trusted source for electric vehicle insights and automotive excellence. Covering EVs, traditional vehicles, and the future of mobility.</description>
    <language>en-US</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://source.unsplash.com/random/144x144/?electric-car</url>
      <title>EV Smarts</title>
      <link>${baseUrl}/</link>
      <width>144</width>
      <height>144</height>
    </image>
    
${rssItems}
  </channel>
</rss>`;

  return rssFeed;
};

// Generate and write the RSS feed
const rssContent = generateRSSFeed();
const outputPath = path.join(__dirname, "../public/rss.xml");

fs.writeFileSync(outputPath, rssContent, "utf8");
console.log("RSS feed generated successfully at:", outputPath);
