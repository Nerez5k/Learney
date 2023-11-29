/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    },
    images: {
        domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"]
    }
}

module.exports = nextConfig