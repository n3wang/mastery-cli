/**
 * I would suggest going to the Quick reference section and just transform the tips (after reading the book.).
 * Todo after the readings:
 *
 * - [ ] Flash the following: https://github.com/HugoMatilla/The-Pragmatic-Programmer
 * - [ ] Add all the challanges of the topics here.
 *
 */

const pragmatic_programmer = [
	{
		term: 'Care about your craft',
		description:
			'Why spend your life developing software unless you care about doing it well?',
		prompt: 'How can you improve your craft?'
	},
	{
		term: 'Think! About Your Work',
		description:
			'Turn off the autopilot and take control. Constantly critique and appraise your work.',
		prompt: 'How can you critique your work more? How could u integrate it to your pipeline?'
	},
	// Sample of the challanges integration
	{
		term: 'ETC Principle',
		prompt: 'Think about a design principle you use regularly. Is it intended to make things easy-to-change?'
	},
	{
		term: 'Communication quicktips',
		prompt: 'Imagine you writting a presentation, memo ',
		description:
			'\
        Explicitly identify the audience and what you need to communicate. If appropriate, talk to your audience afterward and see how accurate your assessment of their needs was'
	},
	{
		term: 'Provide Options dont make lame excuses',
		prompt: '[Insert some random tech/request you dont know about], what do you in response?',
		example: "I don't know, but I will find out"
	},
	{
		term: 'Dry',
		prompt: 'What is DRY and how could u implement it to your current project?',
		description:
			'DRY Principle tells us not to repeat ourseleves, in the terms of intent, but if two separate thigns happen to have the same rules, thts a coincidence, not a duplication.'
	},
	{
		term: 'Orthogonal',
		description:
			' which have a graphical user interface and small but combinable command-line utilities used at shell prompts. Which set is more orthogonal, and why? Which is easier to use for exactly the purpose for which it was intended?',
		prompt: 'Is your code orthogonal? How to make it more orthogonal?',
		example: 'hide your APIs'
	},
	{
		term: 'tracer Code',
		prompt: 'Define a tracer code for your current roject.',
		description:
			'Once you have all the components in the application plumbed together, you have a framework to show your users and your developers.\n\
        Tracer code is lean but complete, and forms part of the skeleton of the final system. Think of prototyping as the reconnaissance and intelligence gathering that takes place before a single tracer bullet is fired.'
	},
	{
		term: 'Prototyping for Marketing',
		description:
			'Marketing would like to sit down and brainstorm a few web page designs with you. They are thinking of clickable image maps to take you to other pages, and so on. But they can’t decide on a model for the image—maybe it’s a car, or a phone, or a house. You have a list of target pages and content; they’d like to see a few prototypes.',
		prompt: 'Oh, by the way, you have 15 minutes. What tools might you use?',
		example:
			'Low-tech to the rescue! Draw a few cartoons with markers on a whiteboard—a car, a phone, and a house. It doesn’t have to be great art; stick-figure outlines are fine. Put Post-it notes that describe the contents of target pages on the clickable areas. As the meeting progresses, you can refine the drawings and placements of the Post-it notes'
	},
	{
		term: 'Architectural Prototype',
		prompt: 'Mention 1+ item you would be looking for?',
		description:
			"Coupling is the degree to which each program module relies on each one of the other modules. So, coupling is all about the relation between modules. Tightly coupled systems have a number of undesirable properties:      Changes in one module tend to have a ripple effect on other modules. (So it's hard to make isolated changes.)     It will be hard to test a module in isolation.     It will be hard to reuse a module in an alternative context.  Cohesion is a measure of how strongly-related or focused the responsibilities of a single module are. Systems with minimal cohesion have a number of undesirable properties:      (When applied to source code) code tends to be less readable.     Code is likely to be less reusable in alternative contexts.     Complexity is high. (It's hard to figure out what belongs where and why.) ",
		example:
			'Are the responsibilities of the major areas well defined and appropriate?\n\
        C: Collaboration - Are the collaborations between major components well defined?\n\
        C: Coupling: Is coupling minimized?\n\
        D: Duplication? Can you identify potential sources of duplication\n\
        C: Constraints - Are interface definitions and constraints acceptable?\n\
        M: Module - Does every module have an access path to the data it needs during execution? Does it have that access when it needs it?'
	}
];

/**
 * Lessons from Video Games that can be applied to real world.
 * This requires an extra document for introinspection
 */
const life_game_lessons = [
	{
		term: 'TW - Alliances and Making Friends',
		description:
			'In TW making alliances is about slowly starting with a peace treaty and leaving time in within. => Then you go with trades => Alliances',
		prompt: 'How can you apply this to your life?',
		example:
			'In long term activities like in classes, start by talking a little bit, Saying hello, => names, => Homeworks and Study Groups => '
	},
	{
		term: 'TW - Spread Node Elite Defense',
		description:
			'In Total War, as you increase your territory you set safeguard mini Defense Specialized armies that can quickly increase of elite units and small in nodes across the map. And spies in near enemy territories to stop attacks.',
		prompt: 'How can you apply this to your life?',
		example:
			'Automated tests sparsed through the code instead of a all-covered test suite. THat are there just to detect\n\
        Similar to an army a large 100% cover test are hard to cover. But having basic elite test suits that run all across the code for the core fucntionalities are like those spread elite code.'
	},
	{
		term: 'TW - inciting own civil wars',
		description:
			'In Total War sometimes you leave inciting armies (When there is no foreign enemies only) so that you can train your internal forces',
		prompt: 'How can you apply this to your life?',
		example:
			'This is like creating internal practice projects to train your skills, whenever there is no clients projects. (Or like joining Hackathons when there is no work)\n\
        It can also be viewed as forcing yourself to mantain an unpracticed framework by working on a long term project.'
	},
	{
		term: 'TW - Distribution of army with setted ratios',
		description:
			'In TW you distribute your army with your:\n\
        - Core Army: 40% Foor Soliers (Shield and Anti Cavalry priority), 20%archers, 20% cavalry, 20% siege\n\
        This Distribution is important because having a balance like such, takes the Calls the advantage of each unique piece. ',
		prompt: 'How can you apply this to your life?',
		example:
			'This might be on the distribution of the focus of the type of work to do. Set up and keep that ratio of time to the different type of work you set on your daily life. How much Udemy? How much project time? How much work? How much Leetcode?\n\
        The same automatic balance ratio should be on the work expected of each project: The distribution on design, marketing, development and documentation.'
	},
	{
		term: 'TW - Guarding Agents',
		description:
			'Is important to always have elite agents to defend for worst cases and always keep them on improvement passively.',
		prompt: 'How can you apply this to your life?',
		example:
			'For example mantainance of longe-term projects are the equivalents of these agents.\n\
        Keep some on different language and design it so that they are integrated into different aspects of your daily life\n\
        SO that there is a motivation to continue upgrading them.'
	},
	{
		term: 'TW Un-managed Warfare Tactics',
		description:
			'Always allow for enemies to attack you, ensamble a trap so they must attack (siege)\n\
        Create a all covering deense to set against their attacks. And ensamble fast moving pieces (horses) to attack tactically, ',
		prompt: 'How could your apply this into your life or dev?',
		example: 'Perphaps designing '
	},
	{
		term: 'TW Set a trap before an attack',
		description:
			'Making them believe that they can come out of their cities. with their large armies, then ambushing and releasing living hell upon them.',
		prompt: 'How could your apply this into your life or dev?',
		example:
			'Perphaps designing and preparing gaps on your projects explainations and thesis so you prepare more in those parts for the interviewers questions.'
	}
];

/**
 * Some of the lessons learnt are not applicable to the daily life
 */
const survival_game_lessons = [];

const life_lessons = [
	{
		term: 'How to study in live sessions?',
		prompt: 'Knowing the following tips, plan how you will take notes and prepare for the next college session',
		description:
			'1. If you cant follow up. Try takingscreenshots, and make comments under the screenshots. (Very useful for  programming classes.)\n\
        2. After completing a homework, try memoizing the learnings into mappings-cli. Usually those are worth more than creating cards from lessons.\n\
        3. Is a good idea to have a todolist trello to add what groups of sessions to be studied at home.'
	}
];

/**
 * Generalized lessons applicable to any field from previous hackathons experinece.
 */
const hackathon_lessons = [
	{
		term: 'Having a buddy forces you to fill the work',
		description: 'Having a buddy forces you to makes you work',
		prompt: 'How can you apply this to your life?',
		example: 'Focusmate is a good way to force you to work.'
	}
];

/**
 * Experiments that teach something in general
 * Like Pavlov dogs or the Stanford Prison Experiment
 */
const experiments_lessons = [];

module.exports = {
	pragmatic_programmer,
	life_game_lessons,
	survival_game_lessons,
	life_lessons,
	hackathon_lessons,
	experiments_lessons
};
