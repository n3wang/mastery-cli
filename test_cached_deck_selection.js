// Test with Flowers deck which loads from cache
const {retrieve_terms_as_decks} = require('./src/md_terms_parser.js');

console.log('\n=== Testing CACHED Deck (Flowers) ===\n');

const decks = retrieve_terms_as_decks();
const flowersDeck = decks['b01-flowers'];

if (!flowersDeck) {
    console.log('ERROR: b01-flowers deck not found!');
    process.exit(1);
}

console.log('Flowers structure:');
console.log('  deck_name:', flowersDeck.deck_name);
console.log('  module_name:', flowersDeck.module_name);
console.log('  terms count:', flowersDeck.terms.length);
console.log('  nested decks count:', flowersDeck.decks ? flowersDeck.decks.length : 0);
console.log('  nested deck names:', flowersDeck.decks ? flowersDeck.decks.map(d => d.deck_name) : []);

console.log('\n=== What appears in deck_titles_with_count (used for UI): ===');
const dictOptions = flowersDeck.deck_titles_with_count;
const titles = Object.keys(dictOptions);

console.log(`Total deck options: ${titles.length}`);
for (const title of titles) {
    const info = dictOptions[title];
    console.log(`\n"${title}"`);
    console.log(`  → name: "${info.name}"`);
    console.log(`  → count: ${info.count}`);
    console.log(`  → nested_count: ${info.nested_count}`);
}

// Check if cache_md folder has nested structure
const fs = require('fs');
const cachePath = 'E:\\Documents\\GitHub\\mastery-cli\\src\\data\\user_data\\terms_modules\\b01-flowers\\cache_md';
console.log('\n=== Cache Structure ===');
if (fs.existsSync(cachePath)) {
    const files = fs.readdirSync(cachePath);
    console.log('Files in cache_md:', files);

    // Check for subdirectories
    const subdirs = files.filter(f => {
        const stat = fs.statSync(`${cachePath}\\${f}`);
        return stat.isDirectory();
    });
    console.log('Subdirectories:', subdirs);

    if (subdirs.length > 0) {
        console.log('\nCache HAS nested structure but deck shows nested_count:', dictOptions[titles[0]].nested_count);
    } else {
        console.log('\nCache has NO nested structure (flat)');
    }
} else {
    console.log('cache_md folder does not exist');
}
