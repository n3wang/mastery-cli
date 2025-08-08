/**
 * Consolidated Terms File - Dynamic Import/Export
 * 
 * This file automatically imports and re-exports all terms from files in the sample_terms/ folder.
 * Any new files added to sample_terms/ will be automatically included.
 */

const fs = require('fs');
const path = require('path');

// Get all JavaScript files in the sample_terms directory
const sampleTermsDir = path.join(__dirname, 'sample_terms');
const files = fs.readdirSync(sampleTermsDir).filter(file => file.endsWith('.js'));

// Dynamically import and collect all exports
const consolidatedExports = {};

files.forEach(file => {
    try {
        const filePath = path.join(sampleTermsDir, file);
        const moduleExports = require(filePath);
        
        // Merge all exports from this file into our consolidated exports
        Object.assign(consolidatedExports, moduleExports);
        
        console.log(`✓ Loaded ${Object.keys(moduleExports).length} exports from ${file}`);
    } catch (error) {
        console.warn(`⚠ Failed to load ${file}:`, error.message);
    }
});

console.log(`📦 Consolidated ${Object.keys(consolidatedExports).length} total exports from ${files.length} files`);

// Export everything
module.exports = consolidatedExports;