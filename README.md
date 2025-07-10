# EV Smarts - Electric Vehicle & Automotive Blog

A modern React-based blog website focused on electric vehicles and automotive content, built with Vite, Material-UI, and React Router.

## Features

- **Responsive Design**: Modern, mobile-friendly interface
- **Blog Posts**: Comprehensive articles about EVs and traditional vehicles
- **Categories**: Separate sections for Electric Vehicles and Non-Electric Vehicles
- **RSS Feed**: Full RSS 2.0 feed with all blog posts
- **Subscription System**: Email-based content gating
- **Comments System**: User-generated comments on blog posts
- **Social Sharing**: Share articles on multiple platforms
- **Author Profiles**: Detailed author information and bios
- **Search Functionality**: Find articles by category and search terms

## RSS Feed

The website includes a comprehensive RSS feed that provides:

- **Full RSS 2.0 Compliance**: Standard-compliant XML feed
- **All Blog Posts**: Includes both EV and Non-EV articles
- **Rich Content**: Article summaries, author info, and publication dates
- **Media Support**: High-quality images for each article
- **Automatic Updates**: Feed updates when new content is added

### RSS Feed URL

```
https://yourdomain.com/rss.xml
```

### RSS Feed Features

- **19 Total Articles**: 10 EV articles + 9 Non-EV articles
- **Author Information**: Complete author details for each post
- **Category Tags**: Proper categorization (Electric Vehicles / Traditional Vehicles)
- **Publication Dates**: Accurate timestamps for all content
- **Content Previews**: Article summaries and full content excerpts

### How to Use the RSS Feed

1. **Access the Feed**: Visit `/rss` page or use the RSS icon in the header
2. **Download**: Click "Download RSS Feed" to save the XML file
3. **Subscribe**: Add the RSS URL to your favorite RSS reader
4. **Share**: Use the share button to distribute the feed URL

### Popular RSS Readers

- [Feedly](https://feedly.com)
- [Inoreader](https://www.inoreader.com)
- [NetNewsWire](https://netnewswire.com)
- [NewsBlur](https://www.newsblur.com)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-ev-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

### Building for Production

1. Generate RSS feed and build the project:

```bash
npm run build
```

2. Preview the production build:

```bash
npm run preview
```

### RSS Feed Generation

To manually generate the RSS feed:

```bash
npm run generate-rss
```

This will create/update the `public/rss.xml` file with the latest blog posts.

## Project Structure

```
src/
├── components/
│   ├── blog/
│   │   ├── BlogCard.jsx
│   │   └── BlogPost.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── CategoryPage.jsx
│   │   └── RSSFeedPage.jsx
│   └── common/
│       └── BackToTop.jsx
├── data/
│   └── blogPosts.js
├── utils/
│   └── rssGenerator.js
└── App.jsx
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Material-UI**: Professional UI components
- **React Router**: Client-side routing
- **RSS 2.0**: Standard-compliant feed format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
