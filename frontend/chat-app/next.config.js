const nextConfig = {
  reactStrictMode: true,
};

try {
  const { createServerRunner } = require('@aws-amplify/adapter-nextjs');

  if (typeof createServerRunner === 'function') {
    console.log("✅ Amplify adapter detected.");
    module.exports = nextConfig; // Keep default config, apply middleware manually in middleware.ts
  } else {
    console.warn("⚠️ Warning: createServerRunner is not a function. Using default config.");
    module.exports = nextConfig;
  }
} catch (error) {
  console.warn("⚠️ Warning: Failed to load @aws-amplify/adapter-nextjs. Using default config.");
  module.exports = nextConfig;
}
