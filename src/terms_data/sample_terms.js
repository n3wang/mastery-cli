/**
 * Consolidated Sample Terms - All Term Collections
 * 
 * This file consolidates all individual term files into a single location.
 * Math formulas remain separate in math_formulas.js
 */

// Import all term collections from individual files
const { react_terms, apex, flutter, IDE_S, chrome_extensions, python_frameworks, react_typescript, dotNet, angular, xcodeIOS, postgresql, npm } = require('./sample_terms/frameworks.js');
const { discrete_math, probability } = require('./sample_terms/math_theory.js');
const { network, network_midterm, artificialIntelligence, artificialIntelligence_2, algebra, calculousOne, network_final } = require('./sample_terms/spring-senior.js');
const { pragmatic_programmer, life_game_lessons, survival_game_lessons, life_lessons, hackathon_lessons, experiments_lessons } = require('./sample_terms/soft_skill_book_game.js');
const { designPatterns, dsa, system_design } = require('./sample_terms/dsa.js');
const { aws_services, aws_glossary, coderTerms, unit_testing, docker, js_advanced, best_practices } = require('./sample_terms/programmer_experience.js');
const { system_design_project } = require('./sample_terms/design.js');
const { accounting } = require('./sample_terms/business_terms.js');
const { interview, interview_filter_frequent, run_when_job } = require('./sample_terms/interview.js');
const { pytorch_machine_learning_course, machine_learning_pandas_visualization, machine_learning_scikit_learn, ai_theory } = require('./sample_terms/ai_machine.js');
const { designing_good_charts, sql } = require('./sample_terms/data-science.js');
const { aws_certification_associate_developer, aws_localstack, aws_certification_cloud_practitioner } = require('./sample_terms/aws_certifications.js');
const { salesforce_experience } = require('./sample_terms/salesforce_certification.js');
const { python, swift, js, dart, php, java, csharp, cpp, typescript, r, matlab, kotlin } = require('./sample_terms/languages.js');
const { analysisAlgorithmClass } = require('./sample_terms/spring-senior-2024.js');
const { cfa_terms } = require('./sample_terms/cfa.js');
const { social_terms } = require('./sample_terms/social.js');
const { wisdom_terms } = require('./sample_terms/wisdom.js');

// Export all collections in a consolidated object
module.exports = {
    // Framework-related terms
    react_terms,
    apex,
    flutter,
    IDE_S,
    chrome_extensions,
    python_frameworks,
    react_typescript,
    dotNet,
    angular,
    xcodeIOS,
    postgresql,
    npm,

    // Math theory terms
    discrete_math,
    probability,

    // Spring semester terms
    network,
    network_midterm,
    artificialIntelligence,
    artificialIntelligence_2,
    algebra,
    calculousOne,
    network_final,

    // Soft skills and book lessons
    pragmatic_programmer,
    life_game_lessons,
    survival_game_lessons,
    life_lessons,
    hackathon_lessons,
    experiments_lessons,

    // DSA and system design
    designPatterns,
    dsa,
    system_design,
    system_design_project,

    // Programming experience
    aws_services,
    aws_glossary,
    coderTerms,
    unit_testing,
    docker,
    js_advanced,
    best_practices,

    // Business terms
    accounting,

    // Interview terms
    interview,
    interview_filter_frequent,
    run_when_job,

    // AI and Machine Learning
    pytorch_machine_learning_course,
    machine_learning_pandas_visualization,
    machine_learning_scikit_learn,
    ai_theory,

    // Data science
    designing_good_charts,
    sql,

    // AWS certifications
    aws_certification_associate_developer,
    aws_localstack,
    aws_certification_cloud_practitioner,

    // Salesforce
    salesforce_experience,

    // Programming languages
    python,
    swift,
    js,
    dart,
    php,
    java,
    csharp,
    cpp,
    typescript,
    r,
    matlab,
    kotlin,

    // Additional spring semester
    analysisAlgorithmClass,

    // CFA terms
    cfa_terms,

    // Social terms
    social_terms,

    // Wisdom terms
    wisdom_terms
};