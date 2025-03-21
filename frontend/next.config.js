/** @type {import('next').NextConfig} */
let withAmplify;

try {
  withAmplify = require('@aws-amplify/adapter-nextjs').withAmplify;
} catch (error) {
  console.warn("⚠️ Warning: @aws-amplify/adapter-nextjs not found. Falling back.");
  withAmplify = (config) => config; // Prevents build failure
}

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withAmplify(nextConfig);
