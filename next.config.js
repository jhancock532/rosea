/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    // allow all scss files access to these files
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "sass:math"; @import "variables.scss"; @import "mixins.scss";`,
  },
};

module.exports = nextConfig;
