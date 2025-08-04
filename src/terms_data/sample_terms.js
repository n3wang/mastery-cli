/**
 * Consolidated Sample Terms - Dynamic Auto-Import
 * 
 * This file automatically imports and re-exports all term collections 
 * from individual files in the sample_terms/ folder.
 * Math formulas remain separate in math_formulas.js
 */

const fs = require('fs');
const path = require('path');

// Get the sample_terms directory path
const sampleTermsDir = path.join(__dirname, 'sample_terms');

// Get all .js files in the sample_terms directory (excluding index.js)
const termFiles = fs.readdirSync(sampleTermsDir)
    .filter(file => file.endsWith('.js') && file !== 'index.js')
    .map(file => path.basename(file, '.js'));

// Dynamically import all exports from each file
const allTerms = {};

termFiles.forEach(fileName => {
    try {
        const filePath = `./sample_terms/${fileName}.js`;
        const fileExports = require(filePath);
        
        // Add all exports from this file to our consolidated object
        Object.assign(allTerms, fileExports);
        
        console.log(`✓ Loaded ${Object.keys(fileExports).length} terms from ${fileName}.js`);
    } catch (error) {
        console.error(`✗ Error loading ${fileName}.js:`, error.message);
    }
});

console.log(`🎯 Total terms collections loaded: ${Object.keys(allTerms).length}`);

// Export all consolidated terms
module.exports = allTerms;