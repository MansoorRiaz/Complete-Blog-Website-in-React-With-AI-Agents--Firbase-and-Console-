import { blogPosts } from "../data/blogPosts.js";

export const generateRSSFeed = () => {
  const baseUrl = "http://localhost:5174";
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

  const rssItems = blogPosts
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

export const downloadRSSFeed = () => {
  const rssContent = generateRSSFeed();
  const blob = new Blob([rssContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "rss.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
