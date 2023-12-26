/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'via.placeholder.com', 'cdn.chec.io'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
