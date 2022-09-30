module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /\.module\.scss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
