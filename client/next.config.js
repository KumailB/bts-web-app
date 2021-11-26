/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_GRAPHQL_API_KEY: process.env.NEXT_GRAPHQL_API_KEY,
    NEXT_APPLICATION_SECRET: process.env.NEXT_APPLICATION_SECRET,
    NEXT_PUBLIC_SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
    NEXT_PUBLIC_SERVER_PORT: process.env.NEXT_PUBLIC_SERVER_PORT,
  }
}
