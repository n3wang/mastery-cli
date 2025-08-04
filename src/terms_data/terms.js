/**
 * <RULES>
 * 
 * 1 Creating Collections: It makes sense to create collection for e.g. functions on an array and their hipothetical use.
 * 2 Strategy > Term:, Or at least bundle a collection of terms, to make it worth more.
 */


const { TermStorage, DeckMask } = require('../structures.js');


const longTermCareer = new DeckMask(
    "long-term-engineer",
    {
        decksToEnableStrings: [
            "discrete-math",
            "probability",
            "sql"
        ]
    }
);


function getMasksByAlgorithm(){
    return [longTermCareer]
}

/**
 * Converts camelCase and snake_case strings to Title Case
 * Examples:
 * - coderTerms -> "Coder Terms"
 * - unit_testing -> "Unit Testing"  
 * - artificialIntelligence_2 -> "Artificial Intelligence 2"
 * - aws_certification_associate_developer -> "Aws Certification Associate Developer"
 */
function convertToTitleCase(str) {
    // First, handle underscores by replacing with spaces
    let result = str.replace(/_/g, ' ');
    
    // Split camelCase by inserting spaces before capital letters
    // This correctly preserves both characters and adds space between them
    result = result.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    
    // Split into words and process each one
    const words = result.split(/\s+/).filter(word => word.length > 0);
    
    return words.join('-');
}

/**
 * 
 * @returns Master Deck containing all the cards
 */
async function populateMasterDeck() {
    terms = []
    
    let decks = new TermStorage([], "Academic Terms");

    // Import all terms from the consolidated sample_terms.js
    const allSampleTerms = require('./sample_terms.js');
    
    // Dynamically create decks for all imported term collections
    Object.keys(allSampleTerms).forEach(termCollectionKey => {
        const termCollection = allSampleTerms[termCollectionKey];
        const deckName = convertToTitleCase(termCollectionKey);
        
        // Only create deck if the collection exists and has content
        if (termCollection && Array.isArray(termCollection) && termCollection.length > 0) {
            decks.addDeck(new TermStorage(termCollection, deckName));
            console.log(`Created deck "${deckName}" with ${termCollection.length} terms`);
        } else if (termCollection) {
            console.log(`Skipped "${termCollectionKey}" - not a valid term array`);
        }
    });

    // Apply masks
    const masks = getMasksByAlgorithm();
    decks.applyMasks(masks);

    console.log(`Total decks created: ${decks.decks.length}`);
    
    return decks;
}

const termJson = [];

module.exports = { termJson, populateMasterDeck };