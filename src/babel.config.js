module.exports = function (api) {
    api.cache(true)
    const presets = [
      ["next/babel", {
        "preset-env": {},
        "preset-react": {}
      }]
    ];
    const plugins = [];

    return {
      presets,
      plugins
    };
}

