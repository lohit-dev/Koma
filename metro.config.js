const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Drizzle migrations are .sql files inlined by babel (see babel.config.js).
config.resolver.sourceExts.push("sql");

module.exports = withNativewind(config);
