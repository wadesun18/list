module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$', // React imports
    '^react-(.*)$', // React-related libraries
    '<THIRD_PARTY_MODULES>', // Node modules
    '^@/(.*)$', // Aliased imports (e.g., "@/components")
    '^[./]', // Relative imports
  ],
  importOrderSeparation: true, // Add a newline between groups
  importOrderSortSpecifiers: true, // Sort named imports
};