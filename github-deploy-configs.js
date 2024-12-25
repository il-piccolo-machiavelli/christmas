// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 정적 파일로 빌드
  basePath: process.env.NODE_ENV === 'production' ? '/repository-name' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

// .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: out
