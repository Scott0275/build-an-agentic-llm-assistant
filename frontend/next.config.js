/** @type {import('next').NextConfig} */
const { withAmplify } = require('@aws-amplify/adapter-nextjs');

const nextConfig = {
  // Your Next.js config here
  // Any other next.js configurations go here.
};

module.exports = withAmplify(nextConfig);