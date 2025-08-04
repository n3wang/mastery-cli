
// https://roadmap.sh/design-system
const system_design_project = [
    {
        term: "stakeholders",
        description: "People who have an interest in the project: designers, frontend developers, accessibility experts, content strategist, researchers, performance experts, product managers, leaders\n\
        Designers: to define the visual elements of the system     Frontend Developers: To create modular efficient code     Accessibility Experts: Accessibility experts to ensure your system conforms to standards like WCAG     Performance Experts: who can ensure your system loads quickly on all devices     Content Strategists: who can help the team nail the voice and tone of the system     Researchers: who can help you understand customer needs     Product Managers: to ensure the system is aligning to customer needs     Leaders: (VPs and directors) to champion and align the vision throughout the company including up to executive leadership",
        prompt: "Who are the stakeholders in a system design project?",
    },
    { 
        term: 'two tier application'
    }
]

// file:///C:/github/documentation/books-job-lfs/James%20Higginbotham%20-%20Principles%20of%20Web%20API%20Design_%20Delivering%20Value%20with%20APIs%20and%20Microservices-Addison-Wesley%20Professional%20(2021).pdf
const API_design = [
    {
        term: "High Cohesion and Loose Coupling",
        prompt: "What does high cohesion and loose coupling mean in API design?",
        description: "High cohesion refers to code that within a module is all closely related to the same function\n\n\
       Coupling is the degree of interdependence between two or more components.\n\
       Tighly coupled components indicates that the components are very constrained by the inplementation details of the other.\n\
       Loosely coupled components hide the components internal details, restricting the knowledge between modules to a public interface."
    },
    {
        term: "Resources are Not Object or domain levels",
        description: "They don’t have the context of why data model design decisions were made. Great API \n\
        designs avoid leaking internal details, including database design choices, by shifting \n\
        from data design to message design.",
        prompt: "What could you fix using that principle? How would you fix it?",
    },
    {
        term: "Principles of Web API Design",
        description: "\n\
        Principle 1: APIs should never be designed in isolation. Collaborative API design \
        is essential for a great API\n\
        Principle 2: API design starts with an outcome-based focus. A focus on the \
        outcome ensures the API delivers value to everyone. \n\
        Principle 3: Select the API design elements that match the need. Trying to find the \
        perfect API style is a fruitless endeavor. Instead, seek to understand and apply the \
        API elements appropriate for the need, whether that is REST, GraphQL, gRPC, or \
        an emerging style just entering the industry.\n\
        Principle 4: API documentation is the most important user interface for \
        developers. Therefore, API documentation should be first class and not left as \
        a last-minute task. \n\
        Principle 5: APIs are forever, so plan accordingly. Thoughtful API design combined with an evolutionary design approach makes APIs resilient to change.",
        prompt: "Provide an example of how could you use this principle in your Paper Trading API project? (Or any other)",
    },
    {
        term: "Collaborative API design",
        attachment: "https://www.webpagescreenshot.info/image-url/mXoks2WJx",
        prompt: "Design a Strategy for the process of developing an API involving Feedback, Frontend Implementation.",
        example: "A smart way is to have two releases. On each release, is devided in two aspects, designing of the API and the second (API Delivery, Frontend Implementation and Customer Feedback)"
    },
    {
        term: "Antipatterns in API Design Process",
        description: "The Leaky Abstraction Antipattern\n\n\
        The Next release Design Fix Antipattern: Design improvements that would result in breaking changes get moved as technical \
        debt to the backlog. \n\n\
        The Heroic Design Effort Antipattern.\n\
        The Unused API Antipattern: If an API is going unused and there is no such validation, expect the api to break,",
        prompt: "Think about an occurance with such antipattern an dhow you coul fix it or do respct to that design.",
    },
    {
        term: "The Agile Manifesto Revisited",
        description: "\n\
        • Our highest priority should be to satisfy the customer. \n\
        • We should welcome changing requirements, even late in development. \n\
        • We must strive to deliver working software frequently.\n\
        • Business people and developers must work together daily.\n\
        • Working software is the primary measure of progress.\n\
        • Be attentive to technical excellence and good design, as this enhances agility.\n\
        • Seek the simple by maximizing the amount of work not done.",
        prompt: "Imaging you were to start a new Project (DD Engine) What policies would you implement as a project manager?"
    }
]


const game_design = [
    {
        term: "Cursed Problems",
        description: "Tools: \n\
        Barriers: block the behaviour by inhibiting information. E.g. Pubg has limited infomration and no support for cooperative that is hard - impossible to make alliances\n\n\
        Carrots: Create another meta game to reward distint behaviours.\n\
        Snores: Instead of avoiding it, make that curse something fun to play\n",
        prompt: "Use any of the the tools mentioned to solve an example game problem: - politics, - Content Creation - mobile problems ",
        attachment: "https://www.webpagescreenshot.info/image-url/vtXlHrEwa",
    },

]

module.exports = { system_design_project, game_design }