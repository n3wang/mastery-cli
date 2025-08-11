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


module.exports = {
	pragmatic_programmer,
};
