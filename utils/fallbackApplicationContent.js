// Snapshot of Notion Timeline/FAQ/Applications content as of 2026-08-10, used only when the live Notion fetch fails or returns no entries for that applicationType.
// This is a fallback, not a source of truth — update Notion first; re-sync this file only if it drifts noticeably out of date.

const FALLBACK_APPLICATION_CONTENT = {
  Students: {
    application: {
      applicationLink: '',
      openRolesLink: '',
      description:
        'If you have programming experience at or above the level of an introductory level computer science class (such as CIS 1100 or AP Computer Science), and you want to apply your classroom knowledge to the real world — making a concrete improvement in people’s lives — then Hack4Impact is the club for you.\n\nWe place a strong emphasis on peer mentorship and learning, so we’ll teach you everything you need to know about designing and building web applications. No experience beyond programming fundamentals is required to join Hack4Impact.\n\nAs part of the team, you will learn how to identify user needs in order to design and build a working product. You’ll have a chance to experiment with and build new technologies.',
    },
    timeline: [
      {
        header: 'Info Sessions',
        body: [
          {
            text: 'At the beginning of the fall semester we will hold info sessions and be active at the SAC and ESAC club fairs, so come say hi and learn more about Hack4Impact!\n\n',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'Fall 2026 Important Recruiting Dates: TBD',
            bold: true,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/1aiDmihyyZvDKqpH8s88W3/4c3915eebaf05dce640c6c156594e4ee/info-xxl.png',
          description: '',
        },
      },
      {
        header: 'Written Application',
        body: [
          {
            text: 'We will release a written application that should take about an hour to complete. We want to learn about what you have done, what you hope to do, and why you would be a good fit for Hack4Impact. Please include any side projects, open source contributions, or anything else you think we should see.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/4W9MVoK6p2153qdoy9m5JD/7506f7ef1dab3929cc198364c66ef52d/pencil-paper.svg',
          description: '',
        },
      },
      {
        header: 'Behavioral Interview',
        body: [
          {
            text: 'If your written application is accepted, we will contact you to schedule a behavioral interview with two Hack4Impact members. We want to know more about you, your passion for social impact, and what you can bring to the Hack4Impact community. This is also a great time to ask questions and get a sense of what being a member of Hack4Impact is like from your interviewers.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/5fL8iR8PK6yqKMiNKIyGut/35533f4b493168fa237fb00f1b33b77b/talk-xxl.png',
          description: '',
        },
      },
      {
        header: 'Technical Interview',
        body: [
          {
            text: "The last portion of the application process is a technical interview with two Hack4Impact members. Don't worry about grinding Leetcode for this one, we only require a CIS 110 level of knowledge, but it will focus on Web Development (the actual technical work that we do!) We want to get a better idea of how you approach problems, implement solutions, and explain your work.",
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/4XgI5xF1nUSRnKeC0jVOc2/47b53f321eef3eac83eff622600b75e4/code-xxl.png',
          description: '',
        },
      },
    ],
    faqs: [
      {
        question: 'Why should I join?',
        answer: [
          {
            text: "As a Hack4Impact member, you can shape the organization's initiatives (or start your own!) in areas such as impact assessment, diversity & inclusion, career development, and more. As an organization and as a community, we care about and actively support the individual development of each member, be it professional or personal. In addition to our social impact projects, we focus on building a tight-knit community of students passionate about social change. As a member of the Hack4Impact family, you will bond with the community and become part of the Hack4Impact family, receive mentorship and guidance from a strong network of accomplished and amazing alumni, watch movies, join in for board game nights, and make memories with your Hack4Impact friends 😊",
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'Who should apply?',
        answer: [
          {
            text: 'Class of 2028, 2029, and 2030. You do NOT have to be a CS major to apply!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'What is the time commitment?',
        answer: [
          {
            text: '1hr full group (mandatory) meeting every Wednesday. ~4 hours outside of that inclusive of social and technical development activities!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'Do you recruit in the Fall or Spring semester?',
        answer: [
          {
            text: 'We usually do not recruit for any positions in the Spring, but we will be recruiting in Fall 2026. Check back in August for any updates about recruitment!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'Can grad students apply?',
        answer: [
          {
            text: 'Yes, grad students are welcome to apply as long as you are not Class of 2027. On the application form, please indicate your latest graduation year from Penn as your "class year".',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'How much software experience do I need to be a technical developer?',
        answer: [
          {
            text: 'If you have taken CIS 110 or AP Computer Science, you are qualified to join Hack4Impact! We have a huge focus on education and will make sure that you have the resources and mentorship opportunities to learn how to build software products. If you are eager to learn the technologies, and are passionate about social impact and community-building, we are excited for you to apply! Developers with web development knowledge are a plus, but please apply even if you don’t know!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'What are you looking for in an applicant?',
        answer: [
          {
            text: 'We are looking for people who are excited about working in social impact and tech and who resonate deeply with our mission and values: ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'http://hack4impact.org/about',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'http://hack4impact.org/about',
          },
          {
            text: "! If you are passionate about software and social impact, a self-starter, want to learn, and are eager to apply your skills to affect real lives, please submit an application! If you are on the fence, please reach out to us. We're super friendly ❤️",
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'What does the technical interview look like?',
        answer: [
          {
            text: 'This year, we are changing up the technical interview from years past. We will providing complete instructions with what to expect after the first round interview.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'I applied to H4I last year but did not get in. Can I re-apply again this year?',
        answer: [
          {
            text: 'YES! Please re-apply. So many of our members did not get in the first time, and we strongly encourage you to submit another application!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question:
          "Should I still apply if I haven't necessarily worked on a structured side project?",
        answer: [
          {
            text: "No worries if you don't have a super structured project that you've worked on. Feel free to write about some of the work that you've done in the courses or through self-learning. The point of the project question is for you to explain and demonstrate the work that you've done with CS, and often, people will write about \"projects\"/assignments they've completed as part of their classes as examples of it. Also, if you feel like this isn't the best time for you to apply and want to wait to get a bit more experience/work, we 100% encourage re-applying or applying the following year. A lot of our members entered as sophomores and juniors, and even one of our current co-directors applied twice! Though, we would encourage you to submit an application this year, EVEN if you are unsure about your skills/experience!",
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question:
          'Some members of H4I mentioned they went on Figma a lot... do some developers design as well?',
        answer: [
          {
            text: "We currently don't have an official design position, but many of our developers do have extra skills they like to work on outside of developing. Design is definitely one of them, and this year, internally, we will be putting together a design committee to build out a lasting team. That said, we do not recruit for designers. For those of you who are interested but not too knowledgable about design, Figma is a collaborative design tool similar to photoshop/illustrator that is ~free~. (Also, a ton of our alum work there so we love it 🥺 )",
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'What does a technical developer/software engineer do in Hack4Impact?',
        answer: [
          {
            text: 'Technical developers drive forward Hack4Impact’s mission by building software that meets important social and humanitarian needs. As a technical developer, you will have the opportunity to develop and ship a project with tangible impact each semester. Within the organization, you can also work on various open-source software initiatives and learn from mentors around you to gain skills necessary to becoming a full-stack developer.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'How does the project structure work?',
        answer: [
          {
            text: 'We source and work on new projects every semester normally in teams of 5-6 people. Each team has a PM (project manager) who handles the majority of client communications and a TL (tech lead) who helps develop and distribute tasks weekly.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
    ],
  },
  Organizations: {
    application: {
      applicationLink:
        'https://docs.google.com/forms/d/1kSSmmI2ksisl-DlRPDFrTh5M90xVUcaOpNMBxdilhqk/viewform?edit_requested=true',
      openRolesLink: '',
      description:
        '\nThat’s awesome! We’d love to talk with you, so please email penn@hack4impact.org and we’ll get back to you as soon as we can.\nWe want to help maximize your nonprofit’s impact, and we’re serious about project quality. We’ll communicate frequently and work with you closely to ensure we’re building exactly what you need.\nWe generally charge $1,000 per project. Our pricing is need-based, and if your organization is not able to afford the cost, we will be happy to lower or even waive the fee. All client contributions feed right back into Hack4Impact to pay for professional development events, speakers, organization retreats, and operating costs.',
    },
    timeline: [
      {
        header: 'Brainstorming',
        body: [
          {
            text: 'Come up with an idea for application that might be useful to your organization.\nMake sure also to visit our ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'completed projects page',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'https://upenn.hack4impact.org/projects',
          },
          {
            text: ' to see what types of applications we’ve built in the past.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/2ToYCXBHebKTvGhv80QgLD/b03943c5f04ca515be345cb7a60c1e87/solutions-xxl.png',
          description: '',
        },
      },
      {
        header: 'Interest Period',
        body: [
          {
            text: 'Once you have an idea in mind, you should fill out the nonprofit interest form. Describe your organization and your project idea. This will help us get an initial sense of your goals, needs, and expectations. The form can be found ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'here',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'https://docs.google.com/forms/d/e/1FAIpQLSc6HT8WyxjWdugR1OULl80xE1Aaz1-dMOo5c179DE4EawOYHg/viewform',
          },
          {
            text: '.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/5rFBCfoZEzPVsli7X8Bxm2/601f8676f4f4a78c0ea762cf6178a22b/list-ingredients-xxl.png',
          description: '',
        },
      },
      {
        header: 'Introduction Call',
        body: [
          {
            text: 'A member of Hack4Impact will reach out to you to schedule a phone call. We’ll use this phone call to learn more about your organization, project idea, and how Hack4Impact can help. Please use this phone call to ask further questions about Hack4Impact.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/1hv5I5e9zZCMWm0oKLAcCw/c3f86bb6f8e053a5299bd822a69afddf/phone-xxl.png',
          description: '',
        },
      },
      {
        header: 'Incubation Period',
        body: [
          {
            text: 'Up to a week before the application deadline, we will work with you to define, clarify, and tighten your project specifications. While submitting a draft of your application for feedback isn’t required, we strongly encourage applicant organizations to do so.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/2ToYCXBHebKTvGhv80QgLD/b03943c5f04ca515be345cb7a60c1e87/solutions-xxl.png',
          description: '',
        },
      },
      {
        header: 'Application Period',
        body: [
          {
            text: 'Submit the project application! Each fall and spring semester, we choose three to four nonprofits to partner with. We will notify you within a few weeks of the application deadline whether you have been selected for the upcoming semester.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/5rFBCfoZEzPVsli7X8Bxm2/601f8676f4f4a78c0ea762cf6178a22b/list-ingredients-xxl.png',
          description: '',
        },
      },
      {
        header: 'Scoping and Ideation',
        body: [
          {
            text: 'If your application is successful, you will be paired with a Hack4Impact project manager (PM), a tech lead (TL) and developer team. Your PM and TL will reach out to better understand the project and to create a plan for the features and timeline of the project in a Project Requirement Document (PRD).',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/4W9MVoK6p2153qdoy9m5JD/7506f7ef1dab3929cc198364c66ef52d/pencil-paper.svg',
          description: '',
        },
      },
      {
        header: 'Development',
        body: [
          {
            text: 'Once the PRD is finalized, we will begin development on the project. Your PM, TL, and development team will work with you over a period of 3 months to build an app. The PM and TL will work with you to ensure that the project is completed on-time and to your specifications.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/4XgI5xF1nUSRnKeC0jVOc2/47b53f321eef3eac83eff622600b75e4/code-xxl.png',
          description: '',
        },
      },
      {
        header: 'Hand Off',
        body: [
          {
            text: 'At the end of the semester, we will officially hand off the project source code to you and your organization for you to begin using! Depending on your technical requirements and resources, we can also help you set up a web host to run the application, or you can integrate it into your existing infrastructure yourself.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/f9mRdZEBAduwVSyZtLOxN/9665ce8b95b4b19b5b950d09836a8a3a/handshake-xxl.png',
          description: '',
        },
      },
      {
        header: 'Testing Period',
        body: [
          {
            text: 'After we hand off the project, you will have a trial period of two months to test out the application. We’ll continue to provide technical support during this period, so if anything breaks or you discover bugs, we’ll happily fix them.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
        image: {
          url: 'https://images.ctfassets.net/dz50cburkkql/4XgI5xF1nUSRnKeC0jVOc2/47b53f321eef3eac83eff622600b75e4/code-xxl.png',
          description: '',
        },
      },
    ],
    faqs: [
      {
        question: 'What types of projects do you work on?',
        answer: [
          {
            text: 'We work on a variety web based applications. These can range from volunteer management systems to automated SMS chatbots. Some examples of tools to consider include:\n• A platform that allows you to keep track of the organization’s activities and see where cost-cutting can occur.\n• A database system that allows you to more easily search through previous financial, client, or service records.\n• An application to keep track of your clients and better assess your overall impact.\nMake sure also to visit our ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'completed projects page',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'https://upenn.hack4impact.org/projects',
          },
          {
            text: ' to see what types of applications we’ve built in the past.\nOur main focus is on software engineering and developer education, so our current offerings ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'do not',
            bold: true,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: ' include:\n• ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'Basic website design and development.',
            bold: true,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: '\nWe do not build websites that are purely content-based, such as Wordpress blogs or landing pages.\n• ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'Technology integration or consulting.',
            bold: true,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: '\nWe do not set up or integrate existing solutions such as Salesforce or Drupal.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'When can I apply?',
        answer: [
          {
            text: 'We source projects for both the Fall and Spring semesters around June and November respectively. Please fill out our ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'nonprofit interest form',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'https://docs.google.com/forms/d/e/1FAIpQLSc6HT8WyxjWdugR1OULl80xE1Aaz1-dMOo5c179DE4EawOYHg/viewform',
          },
          {
            text: ' and keep an eye on this page for exact dates.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'How much does it cost?',
        answer: [
          {
            text: 'We generally charge $1000 per project. Our pricing is need-based, and if your organization is not able to afford the cost, we will be happy to lower or even waive the fee. All client contributions feed right back into Hack4Impact to pay for professional development events, speakers, organization retreats, and operating costs.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'How long do projects take?',
        answer: [
          {
            text: 'Most projects run for about a semester, so about 3 months of development. For the month leading up to that development period, your tech lead and project manager will with you to plan the project. If you are interested in doing a larger project, share your idea to ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'penn@hack4impat.org',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'mailto:penn@hack4impact.org',
          },
          {
            text: ' and we will see what we can do!',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'What technologies do you use?',
        answer: [
          {
            text: 'Currently, most of our projects are build using React and Typescript/Node.js with an Express and MongoDB backend. Feel free to check out our TypeScript boilerplate ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'here',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'https://github.com/Orang-utan/ts-boilerplate',
          },
          {
            text: '.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
      {
        question: 'Do you build mobile apps?',
        answer: [
          {
            text: 'Historically the Penn chapter of Hack4Impact has focused on mainly web development focused projects. If your project specifically needs a mobile app feel free to contact us at ',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
          {
            text: 'penn@hack4impact.org',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: 'mailto:penn@hack4impact.org',
          },
          {
            text: ' and we can connect you with another chapter.',
            bold: false,
            italic: false,
            strikethrough: false,
            code: false,
            href: null,
          },
        ],
      },
    ],
  },
};

export default FALLBACK_APPLICATION_CONTENT;
