/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
  }
}
module.exports = nextConfig
