/** @type {import('next').NextConfig} */
const { withAmplify } = require('@aws-amplify/adapter-nextjs');

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withAmplify(nextConfig);