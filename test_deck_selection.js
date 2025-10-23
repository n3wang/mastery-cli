const {retrieve_terms_as_decks} = require('./src/md_terms_parser.js');

console.log('\n=== Testing Deck Selection Display ===\n');

const decks = retrieve_terms_as_decks();
const plDeck = decks['projects-learning'];

if (!plDeck) {
    console.log('ERROR: projects-learning deck not found!');
    process.exit(1);
}

console.log('Projects-learning structure:');
console.log('  deck_name:', plDeck.deck_name);
console.log('  module_name:', plDeck.module_name);
console.log('  terms count:', plDeck.terms.length);
console.log('  nested decks count:', plDeck.decks ? plDeck.decks.length : 0);
console.log('  nested deck names:', plDeck.decks ? plDeck.decks.map(d => d.deck_name) : []);

console.log('\n=== What appears in deck_titles_with_count (used for UI): ===');
const dictOptions = plDeck.deck_titles_with_count;
const titles = Object.keys(dictOptions);

console.log(`Total deck options: ${titles.length}`);
for (const title of titles) {
    const info = dictOptions[title];
    console.log(`\n"${title}"`);
    console.log(`  → name: "${info.name}"`);
    console.log(`  → count: ${info.count}`);
    console.log(`  → nested_count: ${info.nested_count}`);
}

console.log('\n=== Testing listTerms() for each deck ===');
for (const title of titles) {
    const deckName = dictOptions[title].name;
    const terms = plDeck.listTerms({ get_only: [deckName] });
    console.log(`\n"${deckName}" → ${terms.length} terms returned`);
    if (terms.length > 0) {
        console.log(`  First term: "${terms[0].term}"`);
    }
}

console.log('\n=== Testing if nested decks are visible separately ===');
console.log('Can user select "11-docmost" separately?', titles.some(t => t.includes('11-docmost')) ? 'YES' : 'NO');
console.log('Can user select "2-python-libs" separately?', titles.some(t => t.includes('2-python-libs')) ? 'YES' : 'NO');
console.log('Can user select "projectslearning" parent?', titles.some(t => t.includes('projectslearning')) ? 'YES' : 'NO');
