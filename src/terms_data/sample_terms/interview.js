const interview_all = [
    {
        term: "offer negotiation",
        prompt: "They offer you 75k, but based on your research you need to sastify a budget of 85k",
        description: "You need to negotiate the offer to 85k",
        example: "Thank you for the offer, I am very excited to join the company, I really like that the mission x is x, \
        Before, I accept this offer I believe that based on my education and experience a salary range between 75000 and 85000 would be more aligned to my experience and skills."
    },
    {
        term: "offer negotiation previous salary",
        prompt: "They ask you your previous salary",
        description: "Thats a labor law violation, you need to answer that you don't want to disclose that information",
        example: "I am sorry, I don't feel comfortable disclosing that information, but I can provide a range"
    },
    {
        term: "what-are-your-strengths",
        prompt: "What are your strengths?",
        description: "For the first question, the interviewer was looking to understand my experience leading a project, my role in the project, and the outcome of the project. The interviewer may have also been interested in my ability to manage projects, work within a team, and deliver projects on time and within budget.",
        example: "The last project I headed up was a web application for a healthcare provider. The project involved designing and implementing a system that allowed patients to schedule appointments, view their medical records, and communicate with their healthcare provider securely. The outcome of the project was a success as we delivered the application on time and within budget. The healthcare provider reported increased patient satisfaction and improved efficiency in managing appointments and medical records."
    },
    // Behavioral Interview Questions:
    {
        term: "last-project-outcome",
        prompt: "What was the last project you headed up, and what was its outcome?",
        description: "For the first question, the interviewer was looking to understand my experience leading a project, my role in the project, and the outcome of the project. The interviewer may have also been interested in my ability to manage projects, work within a team, and deliver projects on time and within budget.",
        example: "The last project I headed up was a web application for a healthcare provider. The project involved designing and implementing a system that allowed patients to schedule appointments, view their medical records, and communicate with their healthcare provider securely. The outcome of the project was a success as we delivered the application on time and within budget. The healthcare provider reported increased patient satisfaction and improved efficiency in managing appointments and medical records."
    },
    {
        term: "above-and-beyond",
        prompt: "Give me an example of a time that you felt you went above and beyond the call of duty at work.",
        description: "For the second question, the interviewer was looking to assess my willingness to take initiative, my ability to collaborate and mentor others, and my commitment to the success of the project and the team.",
        example: "I can recall a time when I volunteered to mentor a junior developer who was struggling with a complex project. I spent several extra hours each week working with them, reviewing code, answering questions, and providing guidance. As a result, the project was completed on time and the junior developer gained valuable experience and confidence. I felt that going above and beyond to help the team member was a small effort for me, but it made a significant impact on the project and the person's career."
    },
    {
        term: "work-criticism",
        prompt: "Can you describe a time when your work was criticized?",
        description: "For the third question, the interviewer was looking to assess my ability to handle criticism constructively and professionally, my problem-solving skills, and my ability to communicate effectively with clients and stakeholders.",
        example: "There was a time when a client criticized my work on a project. They were unhappy with the performance of a feature that I had implemented. I took the criticism positively and spent time analyzing the issue, debugging the code, and conducting extensive testing to identify the root cause. I also communicated with the client to understand their specific requirements and made necessary changes to the feature. In the end, the client was satisfied with the improvements made, and the project moved forward smoothly. I learned that constructive feedback is an essential part of growth, and it's essential to respond to criticism positively and take it as an opportunity to improve."
    },
    {
        term: "not-pulling-weight",
        prompt: "Have you ever been on a team where someone was not pulling their own weight? How did you handle it?",
        description: "The interviewer is likely interested in understanding how I deal with challenging situations, how I work with others, and my problem-solving skills.",
        example: "Yes, I have been on a team where someone was not pulling their own weight. I approached the team member privately and asked if they needed help with the project or if there was something that was hindering their progress. After understanding their situation, I worked with them to create a plan to get them back on track. This allowed the project to move forward, and we successfully delivered it on time and within budget."
    },
    {
        term: "difficult-feedback",
        prompt: "Tell me about a time when you had to give someone difficult feedback. How did you handle it?",
        description: "The interviewer is likely interested in understanding how I deal with challenging situations, how I communicate with others, and my problem-solving skills.",
        example: "I had to give a team member difficult feedback about their performance on a project. I scheduled a one-on-one meeting with them to discuss my observations and concerns, and I provided specific examples to help them understand my feedback. I also offered suggestions for improvement and asked if they had any questions or concerns. It was a difficult conversation, but the team member appreciated the feedback and made necessary changes to their work. In the end, the project was successful, and the team member's performance improved."
    },
    {
        term: "greatest-failure",
        prompt: "What is your greatest failure, and what did you learn from it?",
        description: "The interviewer is likely interested in understanding how I deal with failure, how I learn from my mistakes, and my problem-solving skills.",
        example: "My greatest failure was when I underestimated the complexity of a project and did not communicate the risks effectively to my team and stakeholders. As a result, the project was delayed, and we had to allocate additional resources to complete it. I learned that it's essential to communicate effectively with my team and stakeholders, to manage risks proactively, and to be realistic about project timelines and requirements. Since then, I have developed better project management skills, including risk management and effective communication.",
    },
    {
        term: "dealing-with-irritations",
        prompt: "What irritates you about other people, and how do you deal with it?",
        description: "The interviewer is likely interested in understanding how I handle difficult situations, how I manage conflicts, and my problem-solving skills.",
        example: "One thing that irritates me is when team members do not follow through on their commitments. To deal with this, I communicate my expectations clearly, and I follow up regularly to ensure that tasks are completed on time. I also try to understand their perspective and offer support if necessary. I believe that building strong relationships and maintaining open communication is crucial to resolving conflicts and managing irritations effectively."
    },
    {
        term: "disagreement-with-supervisor",
        prompt: "If I were your supervisor and asked you to do something that you disagreed with, what would you do?",
        description: "The interviewer is likely interested in understanding how I handle conflicting situations, how I communicate with my supervisor, and my problem-solving skills.",
        example: "If my supervisor asked me to do something I disagreed with, I would express my concerns respectfully and clearly. I would provide my reasons for disagreeing and suggest alternative approaches that align with our goals and values. If my supervisor insisted on their approach, I would follow their instructions while continuing to provide feedback and suggestions for improvement. I believe that open communication and mutual respect are crucial to building a successful working relationship with a supervisor."
    },
    {
        term: "difficult-period-in-life",
        prompt: "What was the most difficult period in your life, and how did you deal with it?",
        description: "The interviewer is likely interested in understanding how I deal with difficult situations, how I manage stress, and my problem-solving skills.",
        example: "The most difficult period in my life was when I lost a close family member unexpectedly. I took time off work to grieve and sought support from family and friends. I also engaged in self-care activities, such as exercise and meditation, to manage my stress and emotions. I learned the importance of prioritizing my mental and emotional health and seeking support from others during challenging times. I believe that this experience has helped me develop resilience and empathy, which are essential skills in any role."
    },
    {
        term: "doing-something-wrong",
        prompt: "Give me an example of a time you did something wrong. How did you handle it?",
        description: "The interviewer is likely interested in understanding how I handle mistakes, how I take responsibility for my actions, and my problem-solving skills.",
        example: "I once made a mistake in a project where I accidentally deleted some important data. I immediately reported the error to my supervisor and worked with them to recover the data. I also took responsibility for my mistake and apologized to the team and stakeholders. Afterward, I conducted a thorough analysis of the incident to identify the root cause and implemented measures to prevent similar mistakes in the future. I believe that taking responsibility for my actions, learning from my mistakes, and implementing improvements are essential skills for any professional."
    },
    {
        term: "dealing-with-conflict",
        prompt: "Tell me about a time where you had to deal with conflict on the job.",
        description: "The interviewer is likely interested in understanding how I handle conflicts, how I communicate with others, and my problem-solving skills.",
        example: "I had to deal with conflict on a project where two team members had different ideas about how to approach a task. I facilitated a meeting where both team members could express their concerns and ideas, and we reached a compromise that incorporated the best aspects of both approaches. In the end, we were able to complete the project successfully and even came up with a new innovative solution that satisfied both team members. It was a great example of teamwork and collaboration."
    },
    {
        term: "wrong-food-order",
        prompt: "If you were at a business lunch and you ordered a rare steak and they brought it to you well done, what would you do?",
        description: "The interviewer is likely interested in understanding how I handle unexpected situations, how I communicate with others, and my problem-solving skills.",
        example: "In my opinion I am the type of guy that say food is food, I will probably eat it regardless, I dont want to create extra troubles for the waiter or make a scene and make the restaurant look bad\n\
        I barely eat any steak because I dont have that money so I would honestly be happy to eat anything that is in front of me.\n\
        If this is more of a problem solving question, perphaps I would lightly crack a joke and say something like 'Looks like I'm not the only one who's hungry!' and laugh it off. Then, I would politely ask the waiter if they could bring me a new steak cooked to my liking. It's important to be polite, understanding and maintain a positive attitude in those types of situations. Plus, it's a great opportunity to show off your sense of humor and make the most out of a potentially awkward moment."
    },
    {
        term: "doing-something-wrong",
        prompt: "Give me an example of a time you did something wrong. How did you handle it?",
        description: "The interviewer is likely interested in understanding how I handle mistakes, how I take responsibility for my actions, and my problem-solving skills.",
        example: "I once made a mistake in a project where I accidentally sent a document with some errors. I immediately recognized my mistake and took responsibility for it. I then reached out to my supervisor and the team involved and offered to rectify the situation. I worked extra hours and submitted an updated document with all the necessary corrections within the deadline. I also took this as an opportunity to learn from my mistake and double-check all my work to ensure it was error-free moving forward. The team appreciated my honesty, and we were able to continue working collaboratively without any issues."
    },
    {
        term: "illegal-activity",
        prompt: "If you found out your company was doing something against the law, like fraud, what would you do?",
        description: "The interviewer is likely interested in understanding my ethical principles, my sense of responsibility, and my problem-solving skills.",
        example: "If I found out my company was engaged in fraudulent activity, I would immediately report it to the appropriate authorities, such as a regulatory agency or law enforcement. I would also inform my supervisor and HR, and I would cooperate fully with any investigation that follows. I believe that honesty and integrity are essential values for any professional, and I would prioritize doing the right thing, even if it means putting my job at risk. It's crucial to uphold these ethical principles not only for your personal integrity but also to maintain the reputation and credibility of the organization."
    },
    {
        term: "difficult-assignment",
        prompt: "What assignment was too difficult for you, and how did you resolve the issue?",
        description: "The interviewer is likely interested in understanding how I handle difficult tasks, how I problem-solve, and my ability to learn and grow.",
        example: "I once had an assignment where I had to redesign alegacy system with limited documentation, and I found it challenging to understand the codebase and determine the best approach to take. However, I knew it was an excellent opportunity to learn and grow as a developer. To tackle the issue, I took a systematic approach, breaking down the problem into smaller components and seeking advice from colleagues who had experience with similar systems. I also invested time in learning new technologies and best practices, which helped me overcome the challenges I faced. Eventually, I was able to complete the assignment successfully, and it became one of my most significant accomplishments at the company. I learned the value of persistence and determination when faced with challenging situations."
    },
    {
        term: "difficult-decision",
        prompt: "What's the most difficult decision you've made in the last two years and how did you come to that decision?",
        description: "The interviewer is likely interested in understanding my decision-making process, how I handle difficult choices, and my ability to take risks.",
        example: "The most difficult decision I made in the last two years was deciding to leave my previous job and pursue a new opportunity. I had been with my previous company for several years, and I had established strong relationships with my colleagues and supervisors. However, I knew that I needed a new challenge and an opportunity to grow professionally. To make the decision, I weighed the pros and cons of leaving, talked to mentors and friends, and evaluated the new opportunity's potential risks and rewards. Ultimately, I decided to take the leap, and it was one of the best decisions I've made in my career. It allowed me to grow as a professional, expand my skillset, and make new connections in the industry."
    },
    {
        term: "multiple-tasks",
        prompt: "Describe how you would handle a situation if you were required to finish multiple tasks by the end of the day, and there was no conceivable way that you could finish them.",
        description: "The interviewer is likely interested in understanding how I prioritize tasks, how I communicate with colleagues, and my problem-solving skills.",
        example: "If I were required to finish multiple tasks by the end of the day and there was no conceivable way that I could finish them all, I would first prioritize the tasks based on their level of importance and urgency. Then, I would communicate with my supervisor and colleagues, explain the situation, and ask for assistance or help with delegating tasks. I believe that communication is key in such situations, and it's better to be transparent and seek help when needed rather than risking missing deadlines or producing subpar work. Together, we would find a solution that works best for everyone, and we would make sure that all critical tasks are completed on time and to the best of our ability."
    },
    {
        term: "supervisor-disagreement",
        prompt: "If I were your supervisor and asked you to do something that you disagreed with, what would you do?",
        description: "The interviewer is likely interested in understanding how I handle disagreements, how I communicate with superiors, and my problem-solving skills.",
        example: "If my supervisor asked me to do something that I disagreed with, I would first try to understand their reasoning and perspective. Then, I would communicate my own thoughts and concerns in a respectful and professional manner, presenting any evidence or data that supports my position. I believe that open and honest communication is essential, even if it means disagreeing with a superior. If after the discussion, my supervisor still wants me to proceed with their original request, I would comply, while still making sure that I'm executing the task to the best of my abilities. At the end of the day, my job is to support my supervisor and the organization, while also ensuring that I maintain my professional integrity and standards."
    },
    {
        term: "difficult-period",
        prompt: "What was the most difficult period in your life, and how did you deal with it?",
        description: "The interviewer is likely interested in understanding how I handle personal challenges, how I cope with difficult situations, and my resilience.",
        example: "The most difficult period in my life was when I lost my close family member. It was a challenging time for me, and I had to take some time off from work to deal with my emotions and focus on my mental health. During that time, I made sure to stay connected with my support system, including family, friends, and a therapist. I also practiced self-care activities, such as meditation and exercise, to help me stay grounded and centered. Eventually, I was able to return to work and continue with my responsibilities, but the experience taught me the importance of resilience, perseverance, and seeking help when needed. "
    },
    // Basic Interview Qeustions
    {
        term: "tell-me-about-yourself",
        prompt: "Tell me about yourself.",
        description: "The interviewer is likely interested in understanding my background, experience, and how well I align with the job requirements.",
        example: "I am a highly motivated and skilled software engineer with X years of experience in developing and implementing software solutions for various industries. I have expertise in multiple programming languages, database design, and agile development methodologies. Additionally, I have excellent communication skills and enjoy collaborating with teams to produce high-quality deliverables. In my previous positions, I have demonstrated my ability to think creatively, solve complex problems, and deliver projects on time and within budget. I am passionate about keeping up-to-date with the latest technologies and industry trends and am excited about the opportunity to learn new skills and contribute to the success of the organization."
    },
    {
        term: "strengths",
        prompt: "What are your strengths?",
        description: "The interviewer is likely interested in understanding my self-awareness, my ability to assess my own skills, and how well those strengths align with the job requirements.",
        example: "One of my greatest strengths is my ability to work well under pressure. I thrive in fast-paced environments, and I'm always able to prioritize tasks effectively and deliver quality results on time. Another strength is my attention to detail, which allows me to spot even the smallest mistakes and ensure that everything is of the highest quality. Lastly, I believe that my ability to communicate effectively and work collaboratively with others is another significant strength that I bring to the table."
    },
    {
        term: "weaknesses",
        prompt: "What are your weaknesses?",
        description: "The interviewer is likely interested in understanding my self-awareness, my ability to identify areas for improvement, and my willingness to work on those weaknesses.",
        example: "One of my weaknesses is my tendency to take on too much responsibility and struggle with delegating tasks. However, I'm aware of this tendency and have been working on developing my delegation skills, which has led to more effective teamwork and better time management. Another weakness is public speaking, which I've been working on by taking public speaking courses and practicing in front of others. I believe that by acknowledging our weaknesses and actively working on them, we can become better professionals and leaders."
    },
    {
        term: "why-this-job",
        prompt: "Why do you want this job?",
        description: "The interviewer is likely interested in understanding my motivation for applying, how well my skills align with the job requirements, and my potential fit with the company culture.",
        example: "I'm excited about this job because I find gret joy increating useful tools, and solving problems or making people's life easier, and from what I have seen in this company mission and culture, you guys are looking forward. \
        to also serve peoples need by providing the best quality service that matches the customer needs. \n\
        The company's mission to make a positive impact on people's lives through technology also resonates with me, and I'm eager to contribute to that mission. Additionally, I appreciate the company's focus on employee growth and development, which aligns with my career goals. I believe that this company is an excellent fit for me, both in terms of the work I'll be doing and the culture of the organization."
    },
    {
        term: "career-goals",
        prompt: "Where would you like to be in your career five years from now?",
        description: "The interviewer is likely interested in understanding my career aspirations, my ability to set and achieve goals, and my potential fit with the company's long-term plans.",
        example: "In five years, Perphaps is a little simple what I want to do, but I hope I can continue working as a software engineer in the company, my dreams is to be able to have a dependable job, and someday being able to make enough to start my own family, I love programming\n\
        and I see myself as a senior software engineer, leading a team of talented engineers and contributing to cutting-edge technologies that have a positive impact on society. I'm committed to continuous learning and growth, and I plan to take on new challenges and responsibilities that will help me develop as a professional. I believe that this company's focus on employee development and innovation will provide me with the opportunities I need to achieve my goals and reach my full potential."
    },
    {
        term: "ideal-company",
        prompt: "What's your ideal company?",
        description: "The interviewer is likely interested in understanding my values, my work preferences, and my potential fit with the company culture.",
        example: "My ideal company is one that values innovation, collaboration, and social responsibility. I prefer a company culture that is inclusive, supportive, and encourages employees to pursue their passions and interests. Additionally, I value companies that are committed to giving back to their communities and have a positive impact on society. I believe that a company that aligns with my values and work preferences will help me thrive as a professional and contribute to the company's success."
    },
    {
        term: "attracted",
        prompt: "What attracted you to this company?",
        description: "The interviewer is likely interested in understanding my motivation for applying, how well my skills align with the job requirements, and my potential fit with the company culture.",
        example: "What attracted me to this company is its reputation for being a leader in the tech industry and its commitment to making a positive impact on society. The company's innovative projects and cutting-edge technologies inspire me, and I'm excited about the opportunity to work with a talented team of professionals. Additionally, the company's values, such as teamwork, integrity, and accountability, align with my own values and work ethic. I believe that this company is a great fit for me, and I'm excited to contribute to its continued success."
    },
    {
        term: "industry-knowledge",
        prompt: "What do you know about this industry?",
        description: "The interviewer is likely interested in understanding my knowledge and understanding of the industry and how it aligns with the job requirements.",
        example: "As a software engineer, I keep up-to-date with the latest developments and trends in the technology industry. I am aware that this industry is rapidly changing and growing, and there are new technologies emerging every day that could potentially disrupt the status quo. Additionally, I understand that the industry is highly competitive and requires continuous learning and adaptation to remain relevant. I am excited about the opportunity to contribute to this industry and learn new skills and technologies along the way."
    },
    {
        term: "company-knowledge",
        prompt: "What do you know about our company?",
        description: "The interviewer is likely interested in understanding my interest in the company, how well I've researched the company, and my potential fit with the company culture.",
        example: "I have done extensive research on your company and am impressed with your commitment to innovation and social responsibility. I am aware that your company has a reputation for being a leader in the tech industry and has won several awards for its innovative projects. Additionally, I appreciate the company's focus on employee growth and development and the positive impact it has on society. I am excited about the opportunity to work for a company that aligns with my values and work preferences."
    },
    {
        term: "willingness-to-relocate",
        prompt: "Are you willing to relocate?",
        description: "The interviewer is likely interested in understanding my flexibility and willingness to move to a different location for the job.",
        example: "Yes, I am willing to relocate for the job. I understand that this may involve uprooting my personal life, but I am willing to make that sacrifice to pursue my career goals and contribute to the success of the organization. Additionally, I see relocation as an opportunity to experience new cultures and meet new people, which I find exciting."
    },
    {
        term: "questions-for-interviewer",
        prompt: "Do you have any questions for me?",
        description: "The interviewer is likely interested in understanding my interest in the job, the company, and the interviewer's experience.",
        example: "Yes, I have a few questions. What qualities do you think are essential for success in this role? What does a typical day look like in this position? Can you tell me about a time when you faced a challenging situation in this company and how you overcame it? I appreciate the opportunity to learn more about this position and the company culture, and I'm looking forward to the possibility of joining your team."
    },
    // Salary Questions
    {
        term: "salary-expectations",
        prompt: "What salary are you seeking?",
        description: "The interviewer is likely interested in understanding my salary expectations and how they align with the job requirements and industry standards.",
        example: "Based on my research and experience, I am seeking a salary that is competitive with industry standards and reflects the value that I can bring to the organization. I am flexible and willing to negotiate based on the specific details of the job and the benefits package."
    },
    {
        term: "salary-history",
        prompt: "What's your salary history?",
        description: "The interviewer is likely interested in understanding my salary history and how it aligns with the job requirements and industry standards.",
        example: "I prefer not to disclose my salary history, as I believe that salary should be determined based on the specific details of the job and the value that I can bring to the organization. However, based on my research and experience, I am seeking a salary that is competitive with industry standards and reflects the value that I can bring to the organization."
    },
    {
        term: "salary-and-job-description",
        prompt: "If I were to give you this salary you requested but let you write your job description for the next year, what would it say?",
        description: "The interviewer is likely interested in understanding my career goals and how well they align with the job requirements.",
        example: "If given the opportunity to write my job description for the next year, it would include a mix of challenging technical projects and opportunities for professional growth and development. I would be excited about taking on new challenges and learning new skills and technologies, while also contributing to the success of the organization. Additionally, I would prioritize collaboration and communication with my colleagues and ensure that my work aligns with the company's values and mission. I believe that this combination of technical expertise, creativity, and teamwork would enable me to make a significant contribution to the organization."
    },
    // Career Development Questions
    {
        term: "career-development",
        prompt: "What are you looking for in terms of career development?",
        description: "The interviewer is likely interested in understanding my career goals and how well they align with the job requirements.",
        example: "In terms of career development, I am looking for opportunities to enhance my technical skills and gain experience in new technologies and methodologies. I am also interested in taking on leadership roles and mentoring junior team members. Additionally, I am interested in pursuing certifications in relevant fields and attending conferences and workshops to stay up-to-date with the latest industry trends and advancements. I am excited about the opportunity to work for a company that values employee growth and development and provides opportunities for professional advancement."
    },
    {
        term: "self-improvement-in-next-year",
        prompt: "How do you want to improve yourself in the next year?",
        description: "The interviewer is likely interested in understanding my personal and professional development goals and how well they align with the job requirements.",
        example: "In the next year, I am interested in improving my knowledge and skills in cloud computing technologies, machine learning, and data analysis. I am also interested in developing my project management skills and learning how to work more effectively in cross-functional teams. Additionally, I am committed to continuously improving my communication and leadership skills and becoming a more effective mentor and coach to junior team members."
    },
    {
        term: "job-related-goals",
        prompt: "What kind of goals would you have in mind if you got this job?",
        description: "The interviewer is likely interested in understanding my specific goals and objectives for the job and how well they align with the company's mission and vision.",
        example: "If I were to get this job, my goals would include contributing to the success of the organization by delivering high-quality software solutions, collaborating with cross-functional teams to achieve project goals, and continuously improving my technical and soft skills. Additionally, I would like to take on leadership roles and mentor junior team members to help them achieve their full potential. I believe that by achieving these goals, I can make a significant contribution to the organization and advance my career in the process."
    },
    {
        term: "additional-training-suggestion",
        prompt: "If I were to ask your last supervisor to provide you additional training or exposure, what would she suggest?",
        description: "The interviewer is likely interested in understanding my previous job experience and how well it aligns with the job requirements.",
        example: "If you were to ask my last supervisor to provide me with additional training or exposure, she would suggest that I take courses in cloud computing technologies and machine learning to enhance my technical skills. Additionally, she would recommend that I participate in leadership training and workshops to further develop my communication and management skills. My supervisor has always encouraged my growth and development and has provided me with opportunities to attend conferences and workshops to stay up-to-date with the latest industry trends and advancements."
    },
    // Getting Started Questions
    {
        term: "establishing-credibility-with-team",
        prompt: "How would you go about establishing your credibility quickly with the team?",
        description: "The interviewer is likely interested in understanding my ability to integrate with the team quickly and establish myself as a credible member.",
        example: "To establish my credibility quickly with the team, I would start by getting to know each team member individually and learning about their roles, responsibilities, and work styles. I would also ask questions and listen actively to gain a deep understanding of the team's goals, objectives, and challenges. Additionally, I would focus on delivering high-quality work and meeting project milestones on time and within budget. By demonstrating my technical expertise, professionalism, and commitment to the team's success, I believe that I can quickly establish my credibility and gain the trust of my colleagues."
    },
    {
        term: "time-to-make-significant-contribution",
        prompt: "How long will it take for you to make a significant contribution?",
        description: "The interviewer is likely interested in understanding my ability to hit the ground running and make a meaningful impact on the team and the organization.",
        example: "Based on my experience and skills, I believe that I can make a significant contribution to the team and the organization within the first few weeks of joining. I am highly motivated and skilled in delivering high-quality work and meeting project milestones on time and within budget. Additionally, I am comfortable working in cross-functional teams and collaborating with colleagues to achieve common goals. By leveraging my technical expertise and problem-solving skills, I believe that I can quickly make a positive impact and help the team achieve its objectives."
    },
    {
        term: "first-30-days-strategy",
        prompt: "What do you see yourself doing within the first 30 days of this job?",
        description: "The interviewer is likely interested in understanding my specific goals and objectives for the first month on the job.",
        example: "Within the first 30 days of this job, I see myself getting to know my colleagues and the company culture. Additionally, I would spend time learning about the organization's products and services and getting familiar with its technology stack and development methodologies. I would also like to identify areas for improvement and propose solutions to help the team achieve its objectives. By the end of the first 30 days, I would aim to have completed at least one project and established myself as a valuable member of the team."
    },
    {
        term: "first-90-days-strategy",
        prompt: "If selected for this position, can you describe your strategy for the first 90 days?",
        description: "The interviewer is likely interested in understanding my specific goals and objectives for the first three months on the job.",
        example: "If selected for this position, my strategy for the first 90 days would include several key objectives. First, I would focus on building strong relationships with my colleagues and stakeholders to gain a deep understanding of the company culture and work environment. Second, I would work closely with the team to identify areas for improvement and propose solutions to optimize our processes and workflows. Third, I would collaborate with my colleagues to deliver high-quality work and meet project milestones on time and within budget. Finally, I would aim to establish myself as a leader within the team by mentoring junior team members and contributing to the company's overall success."
    },
    // More About You
    {
        term: "work-style",
        prompt: "How would you describe your work style?",
        description: "The interviewer is likely interested in understanding my approach to work and how well it aligns with the job requirements.",
        example: "My work style can be described as detail-oriented, organized, and collaborative. I believe in breaking down complex problems into smaller components and tackling each one systematically. I also prioritize communication and collaboration to ensure that all stakeholders are aligned and informed throughout the project lifecycle. Additionally, I am comfortable working in fast-paced environments and can handle multiple tasks and projects simultaneously. Overall, I believe that my work style allows me to deliver high-quality work on time and within budget while maintaining a positive and productive work environment."
    },
    {
        term: "ideal-working-environment",
        prompt: "What would be your ideal working environment?",
        description: "The interviewer is likely interested in understanding my preferences in terms of work environment and how well they align with the company's culture and values.",
        example: "My ideal working environment is one that promotes creativity, innovation, and collaboration. I enjoy working in a fast-paced and dynamic setting where I can leverage my technical expertise and problem-solving skills to deliver high-quality work. Additionally, I prefer a work environment that values open communication, teamwork, and continuous learning and improvement. I believe that by working in such an environment, I can thrive and make a meaningful contribution to the team and the organization."
    },
    {
        term: "culture-preference",
        prompt: "What do you look for in terms of culture -- structured or entrepreneurial?",
        description: "The interviewer is likely interested in understanding my preferences in terms of organizational culture and how well they align with the company's culture and values.",
        example: "I prefer an entrepreneurial culture that values creativity, innovation, and risk-taking. I believe that such a culture fosters a spirit of entrepreneurship, encourages employees to think outside the box, and promotes a positive and innovative work environment. Additionally, I believe that such a culture allows employees to be more agile and responsive to market changes and customer needs. That said, I also appreciate a structured culture that provides clear guidelines and processes to ensure that work is done efficiently and effectively."
    },
    {
        term: "idea-examples",
        prompt: "Give examples of ideas you've had or implemented.",
        description: "The interviewer is likely interested in understanding my creativity, innovation, and problem-solving skills and how well they align with the job requirements.",
        example: "In my previous positions, I have had several ideas that have resulted in significant improvements and cost savings. For example, I proposed and implemented a new database indexing strategy that reduced query response time by 50%. I also suggested and developed a new project management tool that improved team communication and increased project efficiency by 30%. Additionally, I introduced a new software testing process that reduced software defects by 40%. Overall, I am passionate about innovation and continuous improvement and am always looking for ways to optimize processes and workflows to deliver better outcomes."
    },
    {
        term: "organization-techniques",
        prompt: "What techniques and tools do you use to keep yourself organized?",
        description: "The interviewer is likely interested in understanding my organizational skills and how well they align with the job requirements.",
        example: "I use several techniques and tools to keep myself organized, including to-do lists, calendars, and project management software. I find that breaking down tasks into smaller components and prioritizing them based on their urgency and importance helps me stay on track and meet project milestones on time and within budget. Additionally, I prioritize effective communication and collaboration with my colleagues to ensure that we are aligned and informed throughout the project lifecycle. Overall, I believe that my organizational skills allow me to deliver high-quality work in a fast-paced and dynamic environment."
    },
    {
        term: "big-picture-vs-detail-oriented",
        prompt: "If you had to choose one, would you consider yourself a big-picture person or a detail-oriented person?",
        description: "The interviewer is likely interested in understanding my approach to work and how well it aligns with the job requirements.",
        example: "While I believe that both big-picture thinking and attention to detail are essential to delivering high-quality work, if I had to choose one, I would consider myself more of a big-picture person. I enjoy brainstorming new ideas and strategies, identifying opportunities for growth and improvement, and developing high-level plans to achieve organizational objectives. That said, I also recognize the importance of paying attention to the details and ensuring that all aspects of a project are properly planned and executed to achieve the desired outcomes."
    },
    {
        term: "proudest-achievement",
        prompt: "Tell me about your proudest achievement.",
        description: "The interviewer is likely interested in understanding my accomplishments and how they demonstrate my skills and experience.",
        example: "One of my proudest achievements was leading a cross-functional team to develop and launch a new product line for a major client. The project involved extensive market research, product design, prototyping, testing, and launch planning. I worked closely with the client and internal stakeholders to ensure that the product met all their requirements and expectations. The product was a huge success and generated over $5 million in revenue in its first year. I am proud of the teamwork, collaboration, and problem-solving skills that I and the team demonstrated throughout the project lifecycle."
    },
    {
        term: "favorite-manager",
        prompt: "Who was your favorite manager and why?",
        description: "The interviewer is likely interested in understanding my management style and how well it aligns with the company's culture and values.",
        example: "My favorite manager was at my previous job, where I learned a lot about leadership, communication, and teamwork. She was a great mentor and role model who believed in empowering her team members to take ownership of their work and develop their skills and expertise. She was also an excellent communicator who provided clear guidance and feedback and created a positive and supportive work environment. Additionally, she was a strategic thinker who constantly challenged us to think outside the box and find new and innovative solutions to complex problems. Overall, she was an inspiring and effective leader who helped me develop my career and achieve my professional goals."
    },
    {
        term: "previous-boss",
        prompt: "What do you think of your previous boss?",
        description: "The interviewer is likely interested in understanding my interpersonal skills and how well I work with authority figures.",
        example: "I had several previous bosses throughout my career, and I found each of them to have unique strengths and weaknesses. Overall, I appreciated their leadership and guidance, and I learned a lot from them. While there were times when I disagreed with their decisions or approach, I always respected their authority and tried to communicate my concerns constructively. I believe that effective communication and mutual respect are essential for a positive and productive working relationship between a boss and their employees."
    },
    {
        term: "career-influencer",
        prompt: "Was there a person in your career who really made a difference?",
        description: "The interviewer is likely interested in understanding my professional development and the people who influenced it.",
        example: "One person who made a significant difference in my career was my mentor at a previous job. She was a seasoned professional in my field and took me under her wing when I was starting my career. She provided me with valuable guidance, feedback, and advice and helped me develop my technical and interpersonal skills. Additionally, she introduced me to new opportunities and helped me network with other professionals in the industry. I am grateful for her mentorship, and I strive to pay it forward by mentoring others in my current role."
    },
    {
        term: "personality-work-best",
        prompt: "What kind of personality do you work best with and why?",
        description: "The interviewer is likely interested in understanding my interpersonal skills and how well I work with different personalities.",
        example: "I work best with people who are collaborative, open-minded, and respectful. I believe that effective teamwork requires active listening, constructive communication, and mutual respect. Additionally, I appreciate people who are willing to share their knowledge and expertise and who are committed to continuous learning and improvement. That said, I also appreciate diversity in personality and perspective and enjoy working with people who challenge me to think differently and approach problems from different angles."
    },
    {
        term: "proudest-achievement",
        prompt: "What are you most proud of?",
        description: "The interviewer is likely interested in understanding my accomplishments and how they demonstrate my skills and experience.",
        example: "One of my proudest achievements was leading a team that developed a new software product for a client. The project involved extensive market research, user testing, and development, and I worked closely with the client and internal stakeholders to ensure that the product met their requirements and expectations. The product was a huge success and received positive feedback from users and stakeholders. I am proud of the teamwork, collaboration, and problem-solving skills that my team demonstrated throughout the project lifecycle, and I believe that this achievement showcases my ability to lead and deliver high-quality work in a fast-paced and dynamic environment."
    },
    {
        term: "hobbies-interests",
        prompt: "What do you like to do?",
        description: "The interviewer is likely interested in understanding my personality and interests outside of work.",
        example: "Outside of work, I enjoy a variety of hobbies and interests, including hiking, playing guitar, and reading. I find that these activities help me relax, recharge, and maintain a healthy work-life balance. Additionally, I believe that pursuing my interests and hobbies helps me stay creative and motivated, and it also provides me with opportunities to learn new skills and meet new people."
    },
    {
        term: "lifelong-dreams",
        prompt: "What are your lifelong dreams?",
        description: "The interviewer is likely interested in understanding my long-term goals and aspirations.",
        example: "My lifelong dream is to make a positive impact on society by developing innovative technologies that solve real-world problems. I believe that technology has the power to transform people's lives and create a more equitable and sustainable world. Additionally, I aspire to mentor and inspire the next generation of technologists and entrepreneurs and to help create a diverse and inclusive tech industry."
    },
    {
        term: "ultimate-goal",
        prompt: "What do you ultimately want to become?",
        description: "The interviewer is likely interested in understanding my long-term career goals.",
        example: "Ultimately, I want to become a recognized expert in my field and to make significant contributions to the advancement of my industry. Additionally, I aspire to become a leader who inspires and empowers others to achieve their full potential and to make a positive impact on society. I believe that by staying curious, learning continuously, and embracing new challenges, I can achieve my ultimate goal and make a meaningful difference in the world."
    },
    {
        term: "personal-mission-statement",
        prompt: "What is your personal mission statement?",
        description: "The interviewer is likely interested in understanding my values and how they align with the company's mission and values.",
        example: "My personal mission statement is to use my skills, knowledge, and creativity to make a positive impact on society and to inspire others to do the same. I believe that by staying true to my values of integrity, collaboration, and excellence, I can achieve my mission and help create a better world. Additionally, I strive to embrace diversity and inclusion, to respect different perspectives and cultures, and to work towards creating a more equitable and just society for all."
    },
    {
        term: "positive-things-boss",
        prompt: "What are three positive things your last boss would say about you?",
        description: "The interviewer is likely interested in understanding my professional strengths and how they align with the company's requirements.",
        example: "My last boss would likely say that I am a hard-working, detail-oriented, and collaborative team player. I am always willing to go the extra mile to ensure that tasks are completed on time and to a high standard, and I have a keen eye for detail that helps me catch errors and inconsistencies. Additionally, I enjoy working with others and am skilled at building positive relationships with colleagues, clients, and stakeholders."
    },
    {
        term: "negative-thing-boss",
        prompt: "What negative thing would your last boss say about you?",
        description: "The interviewer is likely interested in understanding my areas for improvement and how I handle feedback.",
        example: "While I believe that I have a good working relationship with my previous bosses, I am aware that there may be areas where I can improve. If my last boss were to mention a negative aspect, it might be that I can be overly perfectionistic at times, which can lead to delays or missed deadlines. However, I am aware of this tendency and work hard to balance attention to detail with timely and efficient work."
    },
    {
        term: "positive-traits-friends",
        prompt: "What three character traits would your friends use to describe you?",
        description: "The interviewer is likely interested in understanding my personal qualities and how they align with the company's culture and values.",
        example: "My friends would likely describe me as empathetic, dependable, and creative. I value emotional intelligence and try to understand the perspectives and feelings of others, which allows me to build strong relationships with colleagues and clients. Additionally, I am reliable and follow through on commitments, which makes me a trustworthy and valued member of any team. Finally, I enjoy using my creativity to solve problems and come up with innovative solutions."
    },
    {
        term: "positive-traits-dont-have",
        prompt: "What are three positive character traits you don't have?",
        description: "The interviewer is likely interested in understanding my self-awareness and ability to identify areas for growth and development.",
        example: "While I believe that I have many positive character traits, there are also areas where I can improve. For example, I sometimes struggle with public speaking and could benefit from developing stronger communication and presentation skills. Additionally, I admire people who are highly organized and detail-oriented, as I believe these traits can be valuable in many professional settings. Finally, I aspire to be more resilient and adaptable in the face of change and uncertainty."
    },
    {
        term: "traits-look-for",
        prompt: "If you were interviewing someone for this position, what traits would you look for?",
        description: "The interviewer is likely interested in understanding my priorities and values as a hiring manager.",
        example: "As a hiring manager, I would look for candidates who are passionate, driven, and collaborative. I believe that passion is essential for success in any field, and I look for candidates who are excited about the work and have a clear vision for how they can contribute to the team. Additionally, I value candidates who are motivated and take ownership of their work, as well as those who are skilled at working with others and building positive relationships. Finally, I look for candidates who are curious, adaptable, and open to learning and growth."
    },
    {
        term: "five-words-character",
        prompt: "List five words that describe your character.",
        description: "The interviewer is likely interested in understanding my personal qualities and how they align with the company's culture and values.",
        example: "Five words that describe my character are reliable, empathetic, detail-oriented, collaborative, and adaptable. I value honesty, dependability, and emotional intelligence, and I believe that attention to detail, strong teamwork, and flexibility are essential for success in any role."
    },
    {
        term: "impactful-person-career",
        prompt: "Who has impacted you most in your career and how?",
        description: "The interviewer is likely interested in understanding the people and experiences that have influenced my professional development.",
        example: "One person who has impacted me greatly in my career is my first manager at my first job out of college. She took the time to teach me the fundamentals of the industry and helped me develop key skills in areas such as project management, client communication, and problem-solving. Additionally, she provided me with valuable mentorship and guidance, and always challenged me to strive for excellence in my work."
    },
    {
        term: "greatest-fear",
        prompt: "What is your greatest fear?",
        description: "The interviewer is likely interested in understanding my personal motivators and potential areas of concern that may impact my performance.",
        example: "My greatest fear is not being able to live up to the expectations that I set for myself. I am very ambitious and always strive to do my best, but I worry that I may fall short in some way or disappoint others. To address this fear, I focus on setting realistic goals and developing a strong support network of colleagues, mentors, and friends who can provide guidance and encouragement along the way."
    },
    {
        term: "biggest-regret",
        prompt: "What is your biggest regret and why?",
        description: "The interviewer is likely interested in understanding my ability to reflect on past experiences and learn from mistakes.",
        example: "My biggest regret is not pursuing a certain opportunity earlier in my career. I had the chance to work on a project that would have been a stretch for me, but I was hesitant to take it on due to my lack of experience in that area. Looking back, I realize that I missed out on a valuable learning opportunity and a chance to grow professionally. However, I learned from this experience and now make a point to take on new challenges and stretch myself outside of my comfort zone."
    },
    {
        term: "qualities-of-a-good-leader",
        prompt: "What are the qualities of a good leader? A bad leader?",
        description: "The interviewer is likely interested in understanding my perspective on leadership and what I believe are important qualities for success in a leadership role.",
        example: "In my opinion, a good leader is someone who is able to inspire and motivate their team, while also providing clear direction and support. They should be able to communicate effectively, delegate tasks appropriately, and be willing to listen to feedback and ideas from their team members. On the other hand, a bad leader is someone who is overly controlling or micromanaging, lacks empathy or understanding of their team members' needs, and is unable to provide effective guidance or support."
    },
    {
        term: "leader-feared-or-liked",
        prompt: "Do you think a leader should be feared or liked?",
        description: "The interviewer is likely interested in understanding my perspective on leadership style and what I believe is effective for motivating and inspiring a team.",
        example: "I believe that a leader should strive to be respected rather than feared or liked. Respect comes from demonstrating integrity, setting a positive example, and being open and honest with team members. It is important for a leader to hold themselves and their team members accountable, while also providing support and guidance to help everyone succeed."
    },
    {
        term: "taking-no-for-an-answer",
        prompt: "How do you feel about taking no for an answer?",
        description: "The interviewer is likely interested in understanding my ability to handle rejection or obstacles and how I approach problem-solving.",
        example: "While it can be difficult to hear 'no', I believe that it is an important part of the problem-solving process. It is important to listen to feedback and understand the reasons behind a decision, and to use that information to adjust your approach or come up with new solutions. Being able to handle rejection or obstacles with grace and resilience is an important skill for success in any role."
    },
    {
        term: "working-for-someone-who-knows-less",
        prompt: "How would you feel about working for someone who knows less than you?",
        description: "The interviewer is likely interested in understanding my willingness to learn from others and how I approach situations where I may have more knowledge or experience than my supervisor.",
        example: "I would feel comfortable working for someone who knows less than me, as long as they are open to feedback and willing to learn. I believe that everyone has something to teach and something to learn, and that a team is strongest when everyone is able to share their unique perspectives and skills. It is important to approach these situations with humility and a willingness to collaborate and share knowledge."
    },
    {
        term: "interviewer-rating",
        prompt: "How do you think I rate as an interviewer?",
        description: "The interviewer is likely interested in understanding my ability to provide constructive feedback and my professionalism in potentially difficult or awkward situations.",
        example: "I think you are doing a great job as an interviewer. You have been asking thoughtful and relevant questions, and have created a comfortable and welcoming environment for this interview. I appreciate your professionalism and your dedication to finding the best fit for this position."
    },
    {
        term: "one-thing-you-wouldnt-want-me-to-know",
        prompt: "Tell me one thing about yourself you wouldn't want me to know.",
        description: "The interviewer is likely asking this question to see how I handle a potentially uncomfortable or embarrassing situation and to gauge my level of honesty and transparency.",
        example: "While there is nothing about myself that I wouldn't want you to know in the context of this interview, there are certain personal details that I prefer to keep private. I believe that everyone has a right to their privacy and boundaries, and that it is important to respect those boundaries in a professional setting."
    },
    {
        term: "good-vs-exceptional",
        prompt: "Tell me the difference between good and exceptional.",
        description: "The interviewer is likely interested in understanding my ability to recognize and strive for excellence, and to differentiate between average performance and exceptional performance.",
        example: "In my opinion, the difference between good and exceptional is the level of dedication, attention to detail, and commitment to excellence. While good performance meets the minimum requirements and expectations, exceptional performance goes above and beyond those expectations and sets a new standard for excellence. Exceptional performance is characterized by creativity, innovation, and a willingness to take risks and challenge the status quo."
    },
    {
        term: "kind-of-car-you-drive",
        prompt: "What kind of car do you drive?",
        description: "The interviewer may be asking this question to build rapport or to gauge my interests and hobbies outside of work.",
        example: "I drive a [insert make and model of car]. While I am interested in cars and enjoy learning about different models and features, I don't consider myself an expert or a 'car person'. For me, a car is primarily a functional tool for getting from point A to point B, but I do appreciate a comfortable and reliable vehicle."
    },
    {
        term: "ideal-location",
        prompt: "There's no right or wrong answer, but if you could be anywhere in the world right now, where would you be?",
        description: "The interviewer may be asking this question to understand my personal preferences and interests, as well as to see how well I can think on my feet.",
        example: "If I could be anywhere in the world right now, I would love to be hiking in the mountains of Banff National Park in Canada. I find the natural beauty and peacefulness of the mountains to be very rejuvenating and inspiring, and I enjoy the physical challenge and sense of accomplishment that comes with a good hike."
    },
    {
        term: "last-book-read",
        prompt: "What's the last book you read?",
        description: "The interviewer may be asking this question to understand my reading habits and interests, as well as to see how well-rounded I am as a candidate.",
        example: "The last book I read was 'The Immortal Life of Henrietta Lacks' by Rebecca Skloot. It's a fascinating and thought-provoking exploration of the ethics and social implications of scientific research, and it raises important questions about race, class, and power in our society."
    },
    {
        term: "magazine-subscriptions",
        prompt: "What magazines do you subscribe to?",
        description: "The interviewer may be asking this question to understand my interests and hobbies outside of work, as well as to see how well-rounded I am as a candidate.",
        example: "I currently subscribe to 'National Geographic' and 'The New Yorker'. I love the stunning photography and fascinating articles in 'National Geographic', and I appreciate the in-depth reporting and thoughtful commentary in 'The New Yorker'. I also enjoy reading a variety of other publications, both online and in print, to stay informed and engaged with current events and cultural trends."
    },
    {
        term: "best-movie-last-year",
        prompt: "What's the best movie you've seen in the last year?",
        description: "The interviewer may be asking this question to understand my interests and hobbies outside of work, as well as to see how well-rounded I am as a candidate.",
        example: "The best movie I've seen in the last year is 'Parasite' by Bong Joon-ho. It's a brilliantly crafted film that combines social commentary, suspense, and dark humor in a way that is both entertaining and thought-provoking. The performances are outstanding, and the cinematography and production design are top-notch. I highly recommend it to anyone who enjoys intelligent and engaging cinema."
    },
    {
        term: "lottery-winnings",
        prompt: "What would you do if you won the lottery?",
        description: "The interviewer may be asking this question to understand my personal goals and priorities, as well as to see how well I can think creatively and strategically.",
        example: "If I won the lottery, the first thing I would do is pay off any outstanding debts and set aside some savings for the future. Then, I would donate a portion of the winnings to a charitable cause or causes that I feel passionate about. Finally, I would use some of the winnings to travel and explore new cultures and experiences, while also investing in my personal and professional development."
    },
    {
        term: "heroes",
        prompt: "Who are your heroes?",
        description: "The interviewer may be asking this question to understand my values and beliefs, as well as to see how I draw inspiration and motivation from others.",
        example: "I have several heroes, both real and fictional, who have influenced and inspired me throughout my life. One of my heroes is [insert name of person or character], who [insert reason why they are a hero to me]. Their [insert specific qualities or actions that I admire] are qualities that I strive to emulate in my own life and work."
    },
    {
        term: "fun-activities",
        prompt: "What do you like to do for fun?",
        description: "The interviewer may be asking this question to understand my interests and hobbies outside of work, as well as to see how well-rounded I am as a candidate.",
        example: "For fun, I enjoy [insert activity or hobby], which allows me to [insert reason why I enjoy this activity or hobby]. I also like to [insert another activity or hobby], which helps me [insert another reason why I enjoy this activity or hobby]. In general, I enjoy spending time outdoors, trying new foods and restaurants, and spending time with family and friends."
    },
    {
        term: "spare-time",
        prompt: "What do you do in your spare time?",
        description: "The interviewer may be asking this question to understand my interests and hobbies outside of work, as well as to see how well-rounded I am as a candidate.",
        example: "In my spare time, I enjoy [insert activity or hobby], which allows me to [insert reason why I enjoy this activity or hobby]. I also like to [insert another activity or hobby], which helps me [insert another reason why I enjoy this activity or hobby]. I also try to stay physically active by [insert another activity or hobby], which helps me maintain a healthy and balanced lifestyle. Additionally, I like to [insert another activity or hobby], which helps me [insert another reason why I enjoy this activity or hobby]."
    },
    {
        term: "clock-hands-overlap",
        prompt: "How many times do a clock's hands overlap in a day?",
        description: "This is a classic interview puzzle question that tests a candidate's critical thinking and problem-solving skills.",
        example: "The clock's hands overlap 22 times in a day. To calculate this, we can use the formula [(11 * hours) - (60 * minutes)] / 2, where 'hours' is the current hour in 24-hour format and 'minutes' is the current minute. We divide by 2 because the clock's hands overlap twice per hour (once when they meet and once when they separate). Therefore, over 24 hours, the hands overlap 22 times."
    },
    {
        term: "weigh-plane-without-scales",
        prompt: "How would you weigh a plane without scales?",
        description: "This is another interview puzzle question that tests a candidate's critical thinking and problem-solving skills, as well as their creativity and resourcefulness.",
        example: "One way to weigh a plane without scales is to use a large balloon filled with helium. We can attach the balloon to the bottom of the plane and measure the amount of helium needed to lift the plane off the ground. Since we know the weight of the helium needed to lift a certain volume of air, we can calculate the weight of the plane based on the volume of air displaced by the balloon. Another way to weigh a plane is to use a hydraulic jack and a pressure gauge. We can lift the plane off the ground using the jack and measure the pressure exerted by the plane's weight on the jack using the pressure gauge. From there, we can calculate the weight of the plane based on the pressure reading."
    },
    {
        term: "10-uses-of-pencil",
        prompt: "Tell me 10 ways to use a pencil other than writing.",
        description: "This question tests a candidate's creativity and ability to think outside the box, as well as their communication skills and ability to articulate their ideas clearly.",
        example: "Sure, here are 10 ways to use a pencil other than writing:\n1. Use it to hold up your hair in a bun or ponytail.\n2. Use it to prop open a window or door.\n3. Use it to stir a drink or mix paint.\n4. Use it as a makeshift screwdriver or pry bar.\n5. Use it to tap on a wall or door to check for hollow spots or studs.\n6. Use it as a conductor for a small electrical circuit.\n7. Use it as a skewer for grilling or roasting small items.\n8. Use it to create a stencil for a design or pattern.\n9. Use it as a level to check for straight lines or angles.\n10. Use it as a microphone to amplify your voice during a presentation or speech."
    },
    {
        term: "sell-me-this-pencil",
        prompt: "Sell me this pencil.",
        description: "This is a classic interview question that tests a candidate's sales skills, as well as their ability to think on their feet and improvise.",
        example: "Where am I? What kind of shap am I situated at? Is there any upcoming event in this scenario? Am I allowed to use customer segmentation? How about advertisement? Is there any competition? Is there a school exam near this location?\n\
        Do I have to ideate a scalable solution and reduce the resources expenditure?"
    },
    {
        term: "animal-you-want-to-be",
        prompt: "If you were an animal, which one would you want to be?",
        description: "This question is often asked to assess a candidate's creativity and imagination, as well as their ability to think on their feet.",
        example: "If I were an animal, I would want to be an eagle. Eagles are majestic creatures that have the ability to soar high above the clouds and see the world from a unique perspective. They are also known for their keen eyesight and hunting prowess, which would give me a sense of power and control over my surroundings."
    },
    {
        term: "fuzz-on-tennis-ball",
        prompt: "Why is there fuzz on a tennis ball?",
        description: "This question is often asked to assess a candidate's knowledge of random trivia and their ability to think critically.",
        example: "The fuzz on a tennis ball is there to help the ball grip the court surface and create more spin and control for the player. The fuzz also helps to slow down the ball slightly, making it easier to return and keep rallies going."
    },
    {
        term: "superhero-power",
        prompt: "If you could choose one superhero power, what would it be and why?",
        description: "This question is often asked to assess a candidate's creativity and imagination, as well as their ability to think critically and problem-solve.",
        example: "If I could choose one superhero power, I would choose the power of teleportation. Being able to instantly transport myself from one place to another would save me so much time and make traveling much easier. It would also give me the ability to escape dangerous or uncomfortable situations quickly and efficiently."
    },
    {
        term: "get-rid-of-a-state",
        prompt: "If you could get rid of any one of the US states, which one would you get rid of and why?",
        description: "This question is often asked to assess a candidate's sense of humor and ability to think on their feet. It is important to approach this question with tact and diplomacy.",
        example: "As much as I love all of the US states, but if I were to want to watch the world burn, if I had to get rid of one, it would probably be Florida, perphaps I would just want to watch the world burn with the by releasing all the florida man's with their alligators to the world."
    },
    {
        term: "tie-shoes-with-eyes-closed",
        prompt: "With your eyes closed, tell me step-by-step how to tie my shoes.",
        description: "This question is often asked to assess a candidate's ability to communicate instructions clearly and effectively.",
        example: "Sure, here's how to tie your shoes with your eyes closed: \n1. Take the two laces and cross them over each other, with one lace on top of the other. \n2. Take the lace that's on top and make a loop, pulling it over and under the other lace. \n3. Take the other lace and wrap it around the loop you just made, tucking it under and through the hole. \n4. Pull the loops tight and adjust as needed. That's it!"
    },

    // Team-work.
    {
        term: "working-with-different-personality",
        prompt: "Talk about a time when you had to work closely with someone whose personality was very different from yours.",
        description: "This question is often asked to assess a candidate's ability to work with diverse personalities and collaborate effectively with others.",
        example: "I had to work closely with a colleague whose personality was very different from mine on a project last year. While I tend to be more reserved and analytical, my colleague was very outgoing and liked to take risks. At first, it was challenging to find common ground and communicate effectively, but we quickly realized that our different perspectives could actually be an asset to the project. We learned to appreciate each other's strengths and weaknesses, and we found ways to balance each other out. By the end of the project, we had developed a strong working relationship and delivered a successful outcome."
    },
    {
        term: "conflict-on-a-team",
        prompt: "Give me an example of a time you faced a conflict while working on a team. How did you handle that?",
        description: "This question is often asked to assess a candidate's ability to navigate difficult situations and resolve conflicts in a professional manner.",
        example: "While working on a team project, I faced a conflict with one of my team members who was not contributing as much as the rest of the team. I approached the situation by first trying to understand the underlying issues and reasons for the lack of contribution. I discovered that the team member was struggling with personal issues that were affecting their work. I then offered to help and provided resources and support to address those issues. This approach helped to resolve the conflict and improve the team member's contribution to the project. It also strengthened our team dynamic and improved communication among team members."
    },
    {
        term: "struggled-to-build-relationship",
        prompt: "Describe a time when you struggled to build a relationship with someone important. How did you eventually overcome that?",
        description: "This question is often asked to assess a candidate's ability to build and maintain relationships with key stakeholders.",
        example: "Early in my career, I struggled to build a relationship with a key client who was hesitant to trust me and my team. I made an effort to understand their concerns and needs, and I worked closely with them to identify solutions that would meet their goals. I also made sure to communicate regularly and clearly with the client, providing updates on our progress and addressing any concerns as soon as they arose. Over time, the client began to see the value of our work and the trust between us grew stronger."
    },
    {
        term: "handling-situation-differently",
        prompt: "We all make mistakes we wish we could take back. Tell me about a time you wish you’d handled a situation differently with a colleague.",
        description: "This question is often asked to assess a candidate's ability to reflect on past experiences and learn from mistakes.",
        example: "There was a situation where I had a disagreement with a colleague over a project we were working on. In hindsight, I wish I had taken a step back and tried to understand their perspective more fully before reacting emotionally. I realized that I could have approached the situation in a more constructive way, by asking questions and seeking to understand their reasoning. Since then, I have made a conscious effort to approach conflicts in a more collaborative manner, and to always try to understand others' viewpoints before jumping to conclusions."
    },
    {
        term: "getting-information-from-non-responsive-person",
        prompt: "Tell me about a time you needed to get information from someone who wasn’t very responsive. What did you do?",
        description: "This question is often asked to assess a candidate's ability to communicate effectively and work through challenging situations.",
        example: "In a previous job, I needed to get some important information from a colleague who was not very responsive to emails and phone calls. Instead of continuing to send messages and hoping for a response, I decided to try a different approach. I arranged to meet the colleague in person and offered to buy them lunch. During the lunch, I explained why I needed the information and how it would benefit both of us. I also listened carefully to their concerns and addressed them as best I could. By the end of the lunch, we had established a stronger working relationship and the colleague was more responsive to my requests."
    },
    {
        term: "under-pressure",
        prompt: "Tell me about a time you were under a lot of pressure. What was going on, and how did you get through it?",
        description: "The interviewer wants to know how I handle high-pressure situations, how I manage stress, and how I prioritize tasks when I have multiple deadlines to meet.",
        example: "In my previous job, we had a project deadline that was quickly approaching, and the team was behind schedule. As the project manager, I was responsible for ensuring that we met the deadline. I organized a meeting with the team, we discussed the challenges, and I assigned specific tasks to each team member based on their strengths. I also set up a timeline and milestones to ensure we were on track. Additionally, I worked extra hours and provided extra support to the team members who needed it. We were able to meet the deadline, and the project was successful. Although it was a challenging time, I learned a lot about myself and my ability to work well under pressure."
    },
    {
        term: "undergoing-change",
        prompt: "Describe a time when your team or company was undergoing some change. How did that impact you, and how did you adapt?",
        description: "The interviewer wants to know how I handle change, adapt to new situations, and deal with uncertainty.",
        example: "At my previous job, our company was acquired by a larger organization, and there were a lot of changes happening. There were new policies, new management, and a shift in company culture. It was a challenging time for me because I had to adapt to new ways of doing things and navigate new relationships with colleagues. However, I remained positive and tried to see the changes as an opportunity to learn and grow. I made an effort to connect with my new colleagues, learn the new policies, and understand the new company culture. I also took on new projects and responsibilities to show my commitment to the company. Ultimately, I was able to adapt successfully to the changes, and it helped me to develop new skills and broaden my professional network."
    },
    {
        term: "first-job",
        prompt: "Tell me about the first job you’ve ever had. What did you do to learn the ropes?",
        description: "The interviewer wants to know about my work history, my ability to learn quickly, and my work ethic.",
        example: "My first job was working as a cashier at a local grocery store. It was a great learning experience for me because it was my first time working in a customer-facing role. I was eager to learn and did everything I could to learn the ropes. I asked a lot of questions, observed my coworkers, and studied the store policies and procedures. I also took the initiative to take on extra tasks, such as stocking shelves and cleaning the store, to show my work ethic and commitment to the job. By the end of my first month, I was comfortable with my role and had developed good relationships with my coworkers and customers."
    },
    {
        term: "goal-setting",
        prompt: "Tell me about a time you set a goal for yourself. How did you go about ensuring that you would meet your objective?",
        description: "The interviewer wants to understand how I approach goal-setting and achieving objectives. They may be interested in my planning and organizational skills, as well as my ability to overcome obstacles and stay motivated.",
        example: "One goal I set for myself was to improve my public speaking skills. I identified the areas that needed improvement, such as nervousness and lack of confidence, and developed a plan to address them. I practiced in front of friends and family, attended public speaking workshops, and volunteered to speak at events. I also received feedback from mentors and peers to track my progress and adjust my approach. Ultimately, I achieved my goal by breaking it down into manageable steps and staying committed to improving."
    },
    {
        term: "managing-responsibilities",
        prompt: "Give me an example of a time you managed numerous responsibilities. How did you handle that?",
        description: "The interviewer wants to understand how I handle multiple tasks and responsibilities. They may be interested in my prioritization and time management skills, as well as my ability to handle stress and work under pressure.",
        example: "In my previous role, I was responsible for managing a team, handling client communications, and delivering projects on time and within budget. To manage these responsibilities, I created a prioritization system where I ranked tasks by urgency and importance. I also delegated tasks to team members, empowering them to take ownership of their work and freeing up my time. Additionally, I set boundaries for myself, such as turning off email notifications during certain times of the day to ensure I could focus on important tasks. Through these methods, I was able to successfully manage my numerous responsibilities and deliver results."
    },
    {
        term: "persuading-someone-to-see-things-your-way",
        prompt: "Give me an example of a time when you were able to successfully persuade someone to see things your way at work.",
        description: "The interviewer is interested in my ability to communicate effectively and influence others in a professional setting.",
        example: "In my previous job, we were discussing a new project where I believed implementing a particular technology would be beneficial for the company. However, my manager was hesitant about it. I scheduled a meeting with my manager and presented a detailed analysis of the technology, including its benefits and potential drawbacks. I also provided case studies of similar projects that had used the same technology and achieved success. After the meeting, my manager was convinced of the benefits and we went ahead with the project using the technology. The project was successful and completed ahead of schedule. This experience taught me the importance of presenting a solid case with facts and data to persuade others to see things from your perspective."
    },
    {
        term: "resolving-frustrated-client",
        prompt: "Describe a time when you had to explain something fairly complex to a frustrated client. How did you handle this delicate situation?",
        description: "The interviewer is interested in my ability to handle challenging situations and communicate technical information to non-technical clients.",
        example: "In my previous job, a client was frustrated and confused about an issue they were facing with our software product. They were having difficulty understanding the technical details I was providing in response to their questions. I realized that I needed to simplify my explanations and break down the technical jargon for the client to better understand the issue. I asked the client specific questions to understand their perspective and concerns. I then explained the issue in simpler terms, using metaphors and analogies to help the client understand the technical concepts. By the end of the conversation, the client was satisfied and thanked me for my patience and clear explanation. This experience taught me the importance of active listening and effective communication, especially when dealing with frustrated clients."
    },
    {
        term: "successful-presentation",
        prompt: "Tell me about a successful presentation you gave and why you think it was a hit.",
        description: "The interviewer is interested in my presentation skills and my ability to communicate effectively to a diverse audience.",
        example: "In my previous job, I was tasked with presenting a new software feature to our clients at a conference. I prepared extensively for the presentation, rehearsing my delivery and ensuring that the slides were visually appealing and easy to understand. During the presentation, I engaged the audience by using anecdotes and humor to keep their attention. I also made sure to address any questions and concerns that arose during the presentation. Afterward, many of the attendees came up to me and complimented me on the presentation, saying that they found it engaging and informative. This experience taught me the importance of preparation, engaging the audience, and being responsive to their needs during the presentation."
    },
    {
        term: "professional-accomplishment",
        prompt: "Tell me about your proudest professional accomplishment.",
        description: "The interviewer is interested in learning about a specific professional accomplishment that I'm proud of and the impact it had. They may also be looking to understand my motivations and what drives me in my work.",
        example: "My proudest professional accomplishment was leading a team that developed a new software product from scratch. We worked tirelessly for months, conducting user research, designing the product, coding, and testing it. It was a complex project that required coordination and collaboration across multiple departments. After launch, the product was very successful, exceeding revenue targets and receiving positive feedback from users. I was proud of what we had accomplished and the impact our product had on the company and its customers. This experience taught me the importance of teamwork, determination, and attention to detail in achieving success."
    },
    {
        term: "problem-solving-initiative",
        prompt: "Describe a time when you saw some problem and took the initiative to correct it rather than waiting for someone else to do it.",
        description: "The interviewer is interested in understanding my problem-solving skills, my ability to take initiative, and my proactivity in the workplace. They may also be looking to assess my level of responsibility and accountability.",
        example: "In my previous job, I noticed that our team's communication had become very disorganized and inefficient. Important messages were getting lost, deadlines were being missed, and progress was stagnating. Rather than waiting for someone else to take action, I decided to take the initiative to address the problem. I started by creating a team communication plan, setting clear guidelines for how we would communicate and collaborate on projects. I also implemented a project management tool to help us track progress and deadlines. As a result of my efforts, our team's productivity increased, deadlines were met, and communication became more effective. This experience taught me the importance of being proactive and taking responsibility for solving problems."
    },
    {
        term: "dissatisfied-in-work",
        prompt: "Tell me about a time you were dissatisfied in your work. What could have been done to make it better?",
        description: "The interviewer wants to know about a time when I was not happy in my job and what could have been done to improve the situation. This question is designed to understand my level of self-awareness and my ability to problem-solve and communicate effectively.",
        example: "I was once in a position where I was dissatisfied with my workload. I felt like I was not being challenged enough and that my skills were being underutilized. I took the initiative to speak with my supervisor about my concerns and we worked together to create new responsibilities for me that better aligned with my skills and interests. This resulted in me feeling more satisfied and motivated in my job. The lesson I learned from this experience is that communication is key in addressing workplace dissatisfaction and that taking the initiative to problem-solve can lead to positive outcomes for both the employee and the company."
    },
    {
        term: "creative-with-work",
        prompt: "Give me an example of a time you were able to be creative with your work. What was exciting or difficult about it?",
        description: "The interviewer wants to assess my ability to be creative and innovative in problem-solving and completing tasks. They also want to learn about how I approach challenges and what I find exciting or difficult in doing so.",
        example: "In my previous role as a marketing specialist, I was tasked with creating a campaign to promote a new product launch. I wanted to do something unique and memorable, so I came up with the idea of creating a virtual reality experience that would allow customers to try out the product in a fun and immersive way. This was exciting because it was something that had never been done before by the company, but it was also difficult because it required a lot of coordination with different teams and a tight timeline. However, I was able to successfully execute the campaign, which led to increased sales and positive customer feedback."
    },
    {
        term: "dissatisfied-in-work",
        prompt: "Tell me about a time you were dissatisfied in your work. What could have been done to make it better?",
        description: "The interviewer wants to learn about my ability to identify and address problems or challenges in the workplace, as well as my willingness to seek solutions and take action. They also want to see if I have the ability to offer constructive feedback to my employer.",
        example: "There was a time in my previous job where I felt like my work was becoming stagnant and unchallenging. I spoke with my supervisor about my concerns and suggested taking on new projects or responsibilities that would allow me to grow and develop my skills. Unfortunately, due to the company's structure and workload, it wasn't possible to immediately assign me new tasks. However, my supervisor recognized my enthusiasm and willingness to take on new challenges, and worked with me to identify areas where I could add value and provided me with additional training opportunities. This helped me to regain my sense of purpose and motivation in the job."
    },
    {
        term: "Create some follow up questions for Trainning and Professional Development",
        prompt: "What training and professional development opportunities are available to employees at your company?",
        description: "The interviewer wants to learn about the company's commitment to employee development and training. They also want to understand what opportunities are available to employees and how they can take advantage of them.",
        example: "11. How will I be trained? 12. What training programs are available to your employees? 13. Are there opportunities for advancement or professional development ? 14. Would I be able to represent the company at industry conferences? 15. Where is the last person who held this job moving on to? 16. Where have successful employees previously in this position progressed to?"
    },
    {
        term: "performance-question",
        prompt: "Ask questions to understand how to set urself to success",
        description: "Make sure you're setting yourself up for success by learning up front the goals of the position and how your work will be evaluated.",
        example: "17. What are the most important things you’d like to see someone accomplish in the first 30, 60, and 90 days on the job? 18. What are the performance expectations of this position over the first 12 months? 19. What is the performance review process like here? How often would I be formally reviewed? 20. What metrics or goals will my performance be evaluated against?"
    },
    {
        term: "interviewer-int-questions",
        prompt: "Ask questions about the interviewer",
        description: "Asking questions of the interviewer shows that you're interested in him or her as a person—and that's a great way to build rapport.",
        example: "21. How long have you been with the company? 22. Has your role changed since you've been here? 23. What did you do before this? 24. Why did you come to this company? 25. What’s your favorite part about working here?"
    },
    {
        term: "company-int-questions",
        prompt: "Ask questions about the company",
        description: "Because you're not just working for one boss or one department, you're working for the company as a whole.",
        example: "26. I've read about the company's founding, but can you tell me more about ___? 27. Where do you see this company in the next few years? 28. What can you tell me about your new products or plans for growth? 29. What are the current goals that the company is focused on, and how does this team work to support hitting those goals? 30. What gets you most excited about the company's future?"
    },
    {
        term: "team-int-questions",
        prompt: "Ask questions about the team",
        description: "The people you work with day in and day out can really make or break your work life. Ask some questions to uncover whether it's the right team for you.",
        example: "31. Can you tell me about the team I’ll be working with? 32. Who will I work with most closely? 33. Who will I report to directly? 34. Can you tell me about my direct reports? What are their strengths and the team's biggest challenges? 35. Do you expect to hire more people in this department in the next six months? 36. Which other departments work most closely with this one? 37. What are the common career paths in this department?"
    },
    {
        term: "culture-int-questions",
        prompt: "Ask questions about the company culture",
        description: "Is the office buttoned-up conservative or a fly-by-the-seat-of-your-pants kind of place? Learn the subtle, but oh-so-important, aspects of company culture.",
        example: "38. What is the company and team culture like? 39. How would you describe the work environment here—is the work typically collaborative or more independent? 40. Can you tell me about the last team event you did together? 41. Is there a formal mission statement or company values? (Note: Make sure this isn't Google-able!) 42. What's your favorite office tradition? 43. What do you and the team usually do for lunch? 44. Does anyone on the team hang out outside the office? 45. Do you ever do joint events with other companies or departments? 46. What's different about working here than anywhere else you've worked? 47. How has the company changed since you joined?"
    },
    {
        term: "next-steps-int-questions",
        prompt: "Ask questions about next steps",
        description: "Before you leave, make sure the interviewer has all of the information he or she needs and that you're clear on the next steps by asking these questions.",
        example: "48. Is there anything that concerns you about my background being a fit for this role? 49. What are the next steps in the interview process? 50. Is there anything else I can provide you with that would be helpful? 51. Can I answer any final questions for you?"
    }

]


// * List of questions to generate when a specific company found, not general passive type of questions.
const run_when_job = [

    {
        term: "career-goals",
        prompt: "Where would you like to be in your career five years from now?",
        description: "The interviewer is likely interested in understanding my career aspirations, my ability to set and achieve goals, and my potential fit with the company's long-term plans.",
        example: "In five years, Perphaps is a little simple what I want to do, but I hope I can continue working as a software engineer in the company, my dreams is to be able to have a dependable job, and someday being able to make enough to start my own family, I love programming\n\
        and I see myself as a senior software engineer, leading a team of talented engineers and contributing to cutting-edge technologies that have a positive impact on society. I'm committed to continuous learning and growth, and I plan to take on new challenges and responsibilities that will help me develop as a professional. I believe that this company's focus on employee development and innovation will provide me with the opportunities I need to achieve my goals and reach my full potential."
    },
    {
        term: "ideal-company",
        prompt: "What's your ideal company?",
        description: "The interviewer is likely interested in understanding my values, my work preferences, and my potential fit with the company culture.",
        example: "My ideal company is one that values innovation, collaboration, and social responsibility. I prefer a company culture that is inclusive, supportive, and encourages employees to pursue their passions and interests. Additionally, I value companies that are committed to giving back to their communities and have a positive impact on society. I believe that a company that aligns with my values and work preferences will help me thrive as a professional and contribute to the company's success."
    },
    {
        term: "attracted",
        prompt: "What attracted you to this company?",
        description: "The interviewer is likely interested in understanding my motivation for applying, how well my skills align with the job requirements, and my potential fit with the company culture.",
        example: "What attracted me to this company is its reputation for being a leader in the tech industry and its commitment to making a positive impact on society. The company's innovative projects and cutting-edge technologies inspire me, and I'm excited about the opportunity to work with a talented team of professionals. Additionally, the company's values, such as teamwork, integrity, and accountability, align with my own values and work ethic. I believe that this company is a great fit for me, and I'm excited to contribute to its continued success."
    },
    {
        term: "industry-knowledge",
        prompt: "What do you know about this industry?",
        description: "The interviewer is likely interested in understanding my knowledge and understanding of the industry and how it aligns with the job requirements.",
        example: "As a software engineer, I keep up-to-date with the latest developments and trends in the technology industry. I am aware that this industry is rapidly changing and growing, and there are new technologies emerging every day that could potentially disrupt the status quo. Additionally, I understand that the industry is highly competitive and requires continuous learning and adaptation to remain relevant. I am excited about the opportunity to contribute to this industry and learn new skills and technologies along the way."
    },
    {
        term: "company-knowledge",
        prompt: "What do you know about our company?",
        description: "The interviewer is likely interested in understanding my interest in the company, how well I've researched the company, and my potential fit with the company culture.",
        example: "I have done extensive research on your company and am impressed with your commitment to innovation and social responsibility. I am aware that your company has a reputation for being a leader in the tech industry and has won several awards for its innovative projects. Additionally, I appreciate the company's focus on employee growth and development and the positive impact it has on society. I am excited about the opportunity to work for a company that aligns with my values and work preferences."
    },
    {
        term: "willingness-to-relocate",
        prompt: "Are you willing to relocate?",
        description: "The interviewer is likely interested in understanding my flexibility and willingness to move to a different location for the job.",
        example: "Yes, I am willing to relocate for the job. I understand that this may involve uprooting my personal life, but I am willing to make that sacrifice to pursue my career goals and contribute to the success of the organization. Additionally, I see relocation as an opportunity to experience new cultures and meet new people, which I find exciting."
    },
    {
        term: "questions-for-interviewer",
        prompt: "Do you have any questions for me?",
        description: "The interviewer is likely interested in understanding my interest in the job, the company, and the interviewer's experience.",
        example: "Yes, I have a few questions. What qualities do you think are essential for success in this role? What does a typical day look like in this position? Can you tell me about a time when you faced a challenging situation in this company and how you overcame it? I appreciate the opportunity to learn more about this position and the company culture, and I'm looking forward to the possibility of joining your team."
    },
    // Salary Questions
    {
        term: "salary-expectations",
        prompt: "What salary are you seeking?",
        description: "The interviewer is likely interested in understanding my salary expectations and how they align with the job requirements and industry standards.",
        example: "Based on my research and experience, I am seeking a salary that is competitive with industry standards and reflects the value that I can bring to the organization. I am flexible and willing to negotiate based on the specific details of the job and the benefits package."
    },
    {
        term: "salary-history",
        prompt: "What's your salary history?",
        description: "The interviewer is likely interested in understanding my salary history and how it aligns with the job requirements and industry standards.",
        example: "I prefer not to disclose my salary history, as I believe that salary should be determined based on the specific details of the job and the value that I can bring to the organization. However, based on my research and experience, I am seeking a salary that is competitive with industry standards and reflects the value that I can bring to the organization."
    },
    {
        term: "salary-and-job-description",
        prompt: "If I were to give you this salary you requested but let you write your job description for the next year, what would it say?",
        description: "The interviewer is likely interested in understanding my career goals and how well they align with the job requirements.",
        example: "If given the opportunity to write my job description for the next year, it would include a mix of challenging technical projects and opportunities for professional growth and development. I would be excited about taking on new challenges and learning new skills and technologies, while also contributing to the success of the organization. Additionally, I would prioritize collaboration and communication with my colleagues and ensure that my work aligns with the company's values and mission. I believe that this combination of technical expertise, creativity, and teamwork would enable me to make a significant contribution to the organization."
    },
    // Career Development Questions
    {
        term: "career-development",
        prompt: "What are you looking for in terms of career development?",
        description: "The interviewer is likely interested in understanding my career goals and how well they align with the job requirements.",
        example: "In terms of career development, I am looking for opportunities to enhance my technical skills and gain experience in new technologies and methodologies. I am also interested in taking on leadership roles and mentoring junior team members. Additionally, I am interested in pursuing certifications in relevant fields and attending conferences and workshops to stay up-to-date with the latest industry trends and advancements. I am excited about the opportunity to work for a company that values employee growth and development and provides opportunities for professional advancement."
    },
    {
        term: "self-improvement-in-next-year",
        prompt: "How do you want to improve yourself in the next year?",
        description: "The interviewer is likely interested in understanding my personal and professional development goals and how well they align with the job requirements.",
        example: "In the next year, I am interested in improving my knowledge and skills in cloud computing technologies, machine learning, and data analysis. I am also interested in developing my project management skills and learning how to work more effectively in cross-functional teams. Additionally, I am committed to continuously improving my communication and leadership skills and becoming a more effective mentor and coach to junior team members."
    },
    {
        term: "job-related-goals",
        prompt: "What kind of goals would you have in mind if you got this job?",
        description: "The interviewer is likely interested in understanding my specific goals and objectives for the job and how well they align with the company's mission and vision.",
        example: "If I were to get this job, my goals would include contributing to the success of the organization by delivering high-quality software solutions, collaborating with cross-functional teams to achieve project goals, and continuously improving my technical and soft skills. Additionally, I would like to take on leadership roles and mentor junior team members to help them achieve their full potential. I believe that by achieving these goals, I can make a significant contribution to the organization and advance my career in the process."
    },
    {
        term: "additional-training-suggestion",
        prompt: "If I were to ask your last supervisor to provide you additional training or exposure, what would she suggest?",
        description: "The interviewer is likely interested in understanding my previous job experience and how well it aligns with the job requirements.",
        example: "If you were to ask my last supervisor to provide me with additional training or exposure, she would suggest that I take courses in cloud computing technologies and machine learning to enhance my technical skills. Additionally, she would recommend that I participate in leadership training and workshops to further develop my communication and management skills. My supervisor has always encouraged my growth and development and has provided me with opportunities to attend conferences and workshops to stay up-to-date with the latest industry trends and advancements."
    },

]

// A highly focused interview filtered for software engineering. Optimized to skip weird questions or late-tier (opinionated).
const interview_filter_frequent = [
    {
        term: "what-are-your-strengths",
        prompt: "What are your strengths?",
        description: "For the first question, the interviewer was looking to understand my experience leading a project, my role in the project, and the outcome of the project. The interviewer may have also been interested in my ability to manage projects, work within a team, and deliver projects on time and within budget.",
        example: "The last project I headed up was a web application for a healthcare provider. The project involved designing and implementing a system that allowed patients to schedule appointments, view their medical records, and communicate with their healthcare provider securely. The outcome of the project was a success as we delivered the application on time and within budget. The healthcare provider reported increased patient satisfaction and improved efficiency in managing appointments and medical records."
    },
    // Behavioral Interview Questions:
    {
        term: "last-project-outcome",
        prompt: "What was the last project you headed up, and what was its outcome?",
        description: "For the first question, the interviewer was looking to understand my experience leading a project, my role in the project, and the outcome of the project. The interviewer may have also been interested in my ability to manage projects, work within a team, and deliver projects on time and within budget.",
        example: "The last project I headed up was a web application for a healthcare provider. The project involved designing and implementing a system that allowed patients to schedule appointments, view their medical records, and communicate with their healthcare provider securely. The outcome of the project was a success as we delivered the application on time and within budget. The healthcare provider reported increased patient satisfaction and improved efficiency in managing appointments and medical records."
    },
    {
        term: "above-and-beyond",
        prompt: "Give me an example of a time that you felt you went above and beyond the call of duty at work.",
        description: "For the second question, the interviewer was looking to assess my willingness to take initiative, my ability to collaborate and mentor others, and my commitment to the success of the project and the team.",
        example: "I can recall a time when I volunteered to mentor a junior developer who was struggling with a complex project. I spent several extra hours each week working with them, reviewing code, answering questions, and providing guidance. As a result, the project was completed on time and the junior developer gained valuable experience and confidence. I felt that going above and beyond to help the team member was a small effort for me, but it made a significant impact on the project and the person's career."
    },
    {
        term: "work-criticism",
        prompt: "Can you describe a time when your work was criticized?",
        description: "For the third question, the interviewer was looking to assess my ability to handle criticism constructively and professionally, my problem-solving skills, and my ability to communicate effectively with clients and stakeholders.",
        example: "There was a time when a client criticized my work on a project. They were unhappy with the performance of a feature that I had implemented. I took the criticism positively and spent time analyzing the issue, debugging the code, and conducting extensive testing to identify the root cause. I also communicated with the client to understand their specific requirements and made necessary changes to the feature. In the end, the client was satisfied with the improvements made, and the project moved forward smoothly. I learned that constructive feedback is an essential part of growth, and it's essential to respond to criticism positively and take it as an opportunity to improve."
    },
    {
        term: "not-pulling-weight",
        prompt: "Have you ever been on a team where someone was not pulling their own weight? How did you handle it?",
        description: "The interviewer is likely interested in understanding how I deal with challenging situations, how I work with others, and my problem-solving skills.",
        example: "Yes, I have been on a team where someone was not pulling their own weight. I approached the team member privately and asked if they needed help with the project or if there was something that was hindering their progress. After understanding their situation, I worked with them to create a plan to get them back on track. This allowed the project to move forward, and we successfully delivered it on time and within budget."
    },
    {
        term: "difficult-feedback",
        prompt: "Tell me about a time when you had to give someone difficult feedback. How did you handle it?",
        description: "The interviewer is likely interested in understanding how I deal with challenging situations, how I communicate with others, and my problem-solving skills.",
        example: "I had to give a team member difficult feedback about their performance on a project. I scheduled a one-on-one meeting with them to discuss my observations and concerns, and I provided specific examples to help them understand my feedback. I also offered suggestions for improvement and asked if they had any questions or concerns. It was a difficult conversation, but the team member appreciated the feedback and made necessary changes to their work. In the end, the project was successful, and the team member's performance improved."
    },
    {
        term: "greatest-failure",
        prompt: "What is your greatest failure, and what did you learn from it?",
        description: "The interviewer is likely interested in understanding how I deal with failure, how I learn from my mistakes, and my problem-solving skills.",
        example: "My greatest failure was when I underestimated the complexity of a project and did not communicate the risks effectively to my team and stakeholders. As a result, the project was delayed, and we had to allocate additional resources to complete it. I learned that it's essential to communicate effectively with my team and stakeholders, to manage risks proactively, and to be realistic about project timelines and requirements. Since then, I have developed better project management skills, including risk management and effective communication.",
    },
    {
        term: "dealing-with-irritations",
        prompt: "What irritates you about other people, and how do you deal with it?",
        description: "The interviewer is likely interested in understanding how I handle difficult situations, how I manage conflicts, and my problem-solving skills.",
        example: "One thing that irritates me is when team members do not follow through on their commitments. To deal with this, I communicate my expectations clearly, and I follow up regularly to ensure that tasks are completed on time. I also try to understand their perspective and offer support if necessary. I believe that building strong relationships and maintaining open communication is crucial to resolving conflicts and managing irritations effectively."
    },
    {
        term: "disagreement-with-supervisor",
        prompt: "If I were your supervisor and asked you to do something that you disagreed with, what would you do?",
        description: "The interviewer is likely interested in understanding how I handle conflicting situations, how I communicate with my supervisor, and my problem-solving skills.",
        example: "If my supervisor asked me to do something I disagreed with, I would express my concerns respectfully and clearly. I would provide my reasons for disagreeing and suggest alternative approaches that align with our goals and values. If my supervisor insisted on their approach, I would follow their instructions while continuing to provide feedback and suggestions for improvement. I believe that open communication and mutual respect are crucial to building a successful working relationship with a supervisor."
    },
    {
        term: "difficult-period-in-life",
        prompt: "What was the most difficult period in your life, and how did you deal with it?",
        description: "The interviewer is likely interested in understanding how I deal with difficult situations, how I manage stress, and my problem-solving skills.",
        example: "The most difficult period in my life was when I lost a close family member unexpectedly. I took time off work to grieve and sought support from family and friends. I also engaged in self-care activities, such as exercise and meditation, to manage my stress and emotions. I learned the importance of prioritizing my mental and emotional health and seeking support from others during challenging times. I believe that this experience has helped me develop resilience and empathy, which are essential skills in any role."
    },
    {
        term: "doing-something-wrong",
        prompt: "Give me an example of a time you did something wrong. How did you handle it?",
        description: "The interviewer is likely interested in understanding how I handle mistakes, how I take responsibility for my actions, and my problem-solving skills.",
        example: "I once made a mistake in a project where I accidentally deleted some important data. I immediately reported the error to my supervisor and worked with them to recover the data. I also took responsibility for my mistake and apologized to the team and stakeholders. Afterward, I conducted a thorough analysis of the incident to identify the root cause and implemented measures to prevent similar mistakes in the future. I believe that taking responsibility for my actions, learning from my mistakes, and implementing improvements are essential skills for any professional."
    },
    {
        term: "dealing-with-conflict",
        prompt: "Tell me about a time where you had to deal with conflict on the job.",
        description: "The interviewer is likely interested in understanding how I handle conflicts, how I communicate with others, and my problem-solving skills.",
        example: "I had to deal with conflict on a project where two team members had different ideas about how to approach a task. I facilitated a meeting where both team members could express their concerns and ideas, and we reached a compromise that incorporated the best aspects of both approaches. In the end, we were able to complete the project successfully and even came up with a new innovative solution that satisfied both team members. It was a great example of teamwork and collaboration."
    },
    {
        term: "illegal-activity",
        prompt: "If you found out your company was doing something against the law, like fraud, what would you do?",
        description: "The interviewer is likely interested in understanding my ethical principles, my sense of responsibility, and my problem-solving skills.",
        example: "If I found out my company was engaged in fraudulent activity, I would immediately report it to the appropriate authorities, such as a regulatory agency or law enforcement. I would also inform my supervisor and HR, and I would cooperate fully with any investigation that follows. I believe that honesty and integrity are essential values for any professional, and I would prioritize doing the right thing, even if it means putting my job at risk. It's crucial to uphold these ethical principles not only for your personal integrity but also to maintain the reputation and credibility of the organization."
    },
    {
        term: "difficult-assignment",
        prompt: "What assignment was too difficult for you, and how did you resolve the issue?",
        description: "The interviewer is likely interested in understanding how I handle difficult tasks, how I problem-solve, and my ability to learn and grow.",
        example: "I once had an assignment where I had to redesign alegacy system with limited documentation, and I found it challenging to understand the codebase and determine the best approach to take. However, I knew it was an excellent opportunity to learn and grow as a developer. To tackle the issue, I took a systematic approach, breaking down the problem into smaller components and seeking advice from colleagues who had experience with similar systems. I also invested time in learning new technologies and best practices, which helped me overcome the challenges I faced. Eventually, I was able to complete the assignment successfully, and it became one of my most significant accomplishments at the company. I learned the value of persistence and determination when faced with challenging situations."
    },
    {
        term: "difficult-decision",
        prompt: "What's the most difficult decision you've made in the last two years and how did you come to that decision?",
        description: "The interviewer is likely interested in understanding my decision-making process, how I handle difficult choices, and my ability to take risks.",
        example: "The most difficult decision I made in the last two years was deciding to leave my previous job and pursue a new opportunity. I had been with my previous company for several years, and I had established strong relationships with my colleagues and supervisors. However, I knew that I needed a new challenge and an opportunity to grow professionally. To make the decision, I weighed the pros and cons of leaving, talked to mentors and friends, and evaluated the new opportunity's potential risks and rewards. Ultimately, I decided to take the leap, and it was one of the best decisions I've made in my career. It allowed me to grow as a professional, expand my skillset, and make new connections in the industry."
    },
    {
        term: "multiple-tasks",
        prompt: "Describe how you would handle a situation if you were required to finish multiple tasks by the end of the day, and there was no conceivable way that you could finish them.",
        description: "The interviewer is likely interested in understanding how I prioritize tasks, how I communicate with colleagues, and my problem-solving skills.",
        example: "If I were required to finish multiple tasks by the end of the day and there was no conceivable way that I could finish them all, I would first prioritize the tasks based on their level of importance and urgency. Then, I would communicate with my supervisor and colleagues, explain the situation, and ask for assistance or help with delegating tasks. I believe that communication is key in such situations, and it's better to be transparent and seek help when needed rather than risking missing deadlines or producing subpar work. Together, we would find a solution that works best for everyone, and we would make sure that all critical tasks are completed on time and to the best of our ability."
    },
    {
        term: "tell-me-about-yourself",
        prompt: "Tell me about yourself.",
        description: "The interviewer is likely interested in understanding my background, experience, and how well I align with the job requirements.",
        example: "I am a highly motivated and skilled software engineer with X years of experience in developing and implementing software solutions for various industries. I have expertise in multiple programming languages, database design, and agile development methodologies. Additionally, I have excellent communication skills and enjoy collaborating with teams to produce high-quality deliverables. In my previous positions, I have demonstrated my ability to think creatively, solve complex problems, and deliver projects on time and within budget. I am passionate about keeping up-to-date with the latest technologies and industry trends and am excited about the opportunity to learn new skills and contribute to the success of the organization."
    },
    {
        term: "strengths",
        prompt: "What are your strengths?",
        description: "The interviewer is likely interested in understanding my self-awareness, my ability to assess my own skills, and how well those strengths align with the job requirements.",
        example: "One of my greatest strengths is my ability to work well under pressure. I thrive in fast-paced environments, and I'm always able to prioritize tasks effectively and deliver quality results on time. Another strength is my attention to detail, which allows me to spot even the smallest mistakes and ensure that everything is of the highest quality. Lastly, I believe that my ability to communicate effectively and work collaboratively with others is another significant strength that I bring to the table."
    },
    {
        term: "weaknesses",
        prompt: "What are your weaknesses?",
        description: "The interviewer is likely interested in understanding my self-awareness, my ability to identify areas for improvement, and my willingness to work on those weaknesses.",
        example: "One of my weaknesses is my tendency to take on too much responsibility and struggle with delegating tasks. However, I'm aware of this tendency and have been working on developing my delegation skills, which has led to more effective teamwork and better time management. Another weakness is public speaking, which I've been working on by taking public speaking courses and practicing in front of others. I believe that by acknowledging our weaknesses and actively working on them, we can become better professionals and leaders."
    },
    {
        term: "professional-accomplishment",
        prompt: "Tell me about your proudest professional accomplishment.",
        description: "The interviewer is interested in learning about a specific professional accomplishment that I'm proud of and the impact it had. They may also be looking to understand my motivations and what drives me in my work.",
        example: "My proudest professional accomplishment was leading a team that developed a new software product from scratch. We worked tirelessly for months, conducting user research, designing the product, coding, and testing it. It was a complex project that required coordination and collaboration across multiple departments. After launch, the product was very successful, exceeding revenue targets and receiving positive feedback from users. I was proud of what we had accomplished and the impact our product had on the company and its customers. This experience taught me the importance of teamwork, determination, and attention to detail in achieving success."
    },
    {
        term: "problem-solving-initiative",
        prompt: "Describe a time when you saw some problem and took the initiative to correct it rather than waiting for someone else to do it.",
        description: "The interviewer is interested in understanding my problem-solving skills, my ability to take initiative, and my proactivity in the workplace. They may also be looking to assess my level of responsibility and accountability.",
        example: "In my previous job, I noticed that our team's communication had become very disorganized and inefficient. Important messages were getting lost, deadlines were being missed, and progress was stagnating. Rather than waiting for someone else to take action, I decided to take the initiative to address the problem. I started by creating a team communication plan, setting clear guidelines for how we would communicate and collaborate on projects. I also implemented a project management tool to help us track progress and deadlines. As a result of my efforts, our team's productivity increased, deadlines were met, and communication became more effective. This experience taught me the importance of being proactive and taking responsibility for solving problems."
    },
    {
        term: "creative-with-work",
        prompt: "Give me an example of a time you were able to be creative with your work. What was exciting or difficult about it?",
        description: "The interviewer wants to assess my ability to be creative and innovative in problem-solving and completing tasks. They also want to learn about how I approach challenges and what I find exciting or difficult in doing so.",
        example: "In my previous role as a marketing specialist, I was tasked with creating a campaign to promote a new product launch. I wanted to do something unique and memorable, so I came up with the idea of creating a virtual reality experience that would allow customers to try out the product in a fun and immersive way. This was exciting because it was something that had never been done before by the company, but it was also difficult because it required a lot of coordination with different teams and a tight timeline. However, I was able to successfully execute the campaign, which led to increased sales and positive customer feedback."
    },
    {
        term: "dissatisfied-in-work",
        prompt: "Tell me about a time you were dissatisfied in your work. What could have been done to make it better?",
        description: "The interviewer wants to learn about my ability to identify and address problems or challenges in the workplace, as well as my willingness to seek solutions and take action. They also want to see if I have the ability to offer constructive feedback to my employer.",
        example: "There was a time in my previous job where I felt like my work was becoming stagnant and unchallenging. I spoke with my supervisor about my concerns and suggested taking on new projects or responsibilities that would allow me to grow and develop my skills. Unfortunately, due to the company's structure and workload, it wasn't possible to immediately assign me new tasks. However, my supervisor recognized my enthusiasm and willingness to take on new challenges, and worked with me to identify areas where I could add value and provided me with additional training opportunities. This helped me to regain my sense of purpose and motivation in the job."
    },


]



module.exports = { interview: interview_all, interview_filter_frequent, run_when_job }