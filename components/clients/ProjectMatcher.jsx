/**
 * ProjectMatcher.js
 * A utility class for matching nonprofits with relevant projects based on their quiz answers
 */

class ProjectMatcher {
    constructor(projects) {
      this.projects = projects;
      
      // Define tags for each answer option per question
      this.questionTags = [
        // Question 1: Pain points
        [
          ["program-delivery", "service-optimization", "client-management"],
          ["operations", "workflow", "administrative", "automation"],
          ["data-collection", "impact-measurement", "reporting", "analytics"],
          ["community-engagement", "outreach", "communication", "social-media"]
        ],
        // Question 2: Technology capacity
        [
          ["low-tech", "entry-level", "simple-interface"],
          ["basic-tech", "spreadsheet-replacement", "data-organization"],
          ["integration", "crm-enhancement", "third-party-connection"],
          ["advanced", "specialized", "technical", "scaling"]
        ],
        // Question 3: Desired outcomes
        [
          ["increased-reach", "service-expansion", "capacity-building"],
          ["efficiency", "time-saving", "workflow-optimization"],
          ["data-quality", "metrics", "impact-tracking", "visualization"],
          ["stakeholder-engagement", "communication-platform", "community-building"]
        ]
      ];
      
      // Project type keywords
      this.projectTypeKeywords = {
        "database": ["database", "data management", "information system", "records"],
        "mobile-app": ["mobile", "app", "smartphone", "ios", "android"],
        "web-app": ["web", "platform", "portal", "online system"],
        "automation": ["automation", "workflow", "process", "streamline"],
        "reporting": ["reporting", "analytics", "dashboard", "visualization"],
        "communication": ["communication", "messaging", "notification", "alert"]
      };
    }
  
    /**
     * Generate the most relevant project matches based on quiz answers
     * @param {Array} answers - Array of answer indices (0-3) for each question
     * @returns {Object} Object containing top match and alternative matches
     */
    findMatches(answers) {
      // Extract tags from the nonprofit's answers
      const selectedTags = answers.map((answerIndex, questionIndex) => {
        // Ensure answerIndex is within bounds (0-3)
        const validIndex = Math.min(Math.max(0, answerIndex), 3);
        return this.questionTags[questionIndex][validIndex];
      }).flat();
  
      // Score each project based on relevance to answers
      const scoredProjects = this.projects.map(project => {
        const score = this.calculateMatchScore(project, selectedTags);
        return {
          ...project,
          matchScore: score
        };
      });
  
      // Sort by score (highest first)
      scoredProjects.sort((a, b) => b.matchScore - a.matchScore);
  
      // Return top match and alternatives
      return {
        topMatch: scoredProjects[0],
        alternativeMatches: scoredProjects.slice(1, 3),
        // allMatches: scoredProjects
      };
    }
  
    /**
     * Calculate match score between a project and selected tags
     * @param {Object} project - Project object
     * @param {Array} selectedTags - Tags extracted from user's answers
     * @returns {number} Match score
     */
    calculateMatchScore(project, selectedTags) {
      let score = 0;
      let matchedTags = new Set();
      
      // Combine project data for content analysis
      const projectContent = JSON.stringify({
        title: project.title,
        description: project.description?.json || "",
        completedIn: project.completedIn
      }).toLowerCase();
  
      // Score based on selected tags with weighted importance
      selectedTags.forEach(tag => {
        const cleanTag = tag.replace('-', ' ');
        
        // Exact match with increased weight
        if (projectContent.includes(cleanTag)) {
          score += 3;
          matchedTags.add(tag);
        } 
        // Partial match for compound tags (e.g., "data-collection" would match "data" or "collection")
        else if (cleanTag.includes(' ') && 
                cleanTag.split(' ').some(part => projectContent.includes(part))) {
          score += 1.5;
          matchedTags.add(tag);
        }
        // Match related concepts using stemming (simplified version)
        else {
          const stemRelations = {
            'report': ['analytics', 'dashboard', 'metrics', 'visualization'],
            'data': ['database', 'analytics', 'metrics', 'reporting'],
            'engage': ['community', 'outreach', 'social', 'communication'],
            'automat': ['workflow', 'process', 'efficiency'],
            'optim': ['efficiency', 'streamline', 'workflow'],
            'impact': ['measure', 'tracking', 'reporting', 'metrics']
          };
          
          for (const [stem, related] of Object.entries(stemRelations)) {
            if (cleanTag.includes(stem) && 
                related.some(term => projectContent.includes(term))) {
              score += 1;
              matchedTags.add(tag);
              break;
            }
          }
        }
      });
  
      // Bonus for matching multiple tags from same question (indicating strong alignment)
      const questionTagSets = this.questionTags.map(q => new Set(q.flat()));
      questionTagSets.forEach(tagSet => {
        const matchCount = [...matchedTags].filter(tag => tagSet.has(tag)).length;
        if (matchCount >= 2) {
          score += matchCount * 0.75; // Additional bonus for multiple matches from same question
        }
      });
  
      // Infer project type from content with improved weighting
      for (const [type, keywords] of Object.entries(this.projectTypeKeywords)) {
        const typeMatchesAnswers = selectedTags.some(tag => tag.includes(type));
        let keywordMatches = 0;
        
        keywords.forEach(keyword => {
          if (projectContent.includes(keyword)) {
            keywordMatches++;
            // Boost score more if this type aligns with selected answers
            score += typeMatchesAnswers ? 2 : 0.75;
          }
        });
        
        // Additional bonus for multiple keyword matches indicating strong type alignment
        if (keywordMatches > 1 && typeMatchesAnswers) {
          score += keywordMatches * 0.5;
        }
      }
  
      // Smart recency boost with graduated scaling
      const yearMatch = project.completedIn?.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - year;
        
        // Higher boost for more recent projects, graduating scale
        if (yearDiff <= 1) score += 1.5;
        else if (yearDiff <= 2) score += 1.25;
        else if (yearDiff <= 3) score += 1;
        else if (yearDiff <= 4) score += 0.75;
        else if (yearDiff <= 5) score += 0.5;
      }
  
      // Normalize score to avoid extreme values
      return Math.min(Math.round(score * 10) / 10, 20); // Cap at 20 and round to 1 decimal
    }
    
    /**
     * Get descriptions of why the top matches are relevant
     * @param {Array} topProjects - Array of matched projects with scores
     * @param {Array} answers - Original quiz answers
     * @returns {Array} Projects with explanation properties
     */
    generateMatchExplanations(topProjects, answers) {
      // Map question indices to their themes and benefits
      const themes = {
        0: {
          labels: ["program delivery", "operational efficiency", "data management", "community engagement"],
          benefits: [
            "improving service delivery and client management",
            "streamlining administrative workflows",
            "enhanced data collection and impact measurement",
            "better community outreach and stakeholder engagement"
          ]
        },
        1: {
          labels: ["simple solutions", "basic digital tools", "integrated systems", "specialized technology"],
          benefits: [
            "easy-to-use solutions for organizations new to technology",
            "digitizing manual processes with familiar interfaces",
            "connecting with existing tools and platforms",
            "advanced solutions for complex technical challenges"
          ]
        },
        2: {
          labels: ["expanding reach", "reducing workload", "improving reporting", "enhancing engagement"],
          benefits: [
            "expanding program reach and service capacity",
            "reducing administrative burden and saving staff time",
            "better data quality and impact visualization",
            "stronger connections with stakeholders and community"
          ]
        }
      };
      
      return topProjects.map(project => {
        // Get thematic strengths from answers
        const relevantThemeLabels = answers.map((answer, index) => themes[index].labels[answer]);
        const relevantBenefits = answers.map((answer, index) => themes[index].benefits[answer]);
        
        // Select 1-2 most relevant benefits (avoiding repetition)
        const uniqueBenefits = [...new Set(relevantBenefits)];
        const keyBenefits = uniqueBenefits.slice(0, 2);
        
        // Build explanation focusing on themes and benefits
        const explanation = `This project aligns with your focus on ${relevantThemeLabels.join(", ")}. 
          It demonstrates our approach to ${keyBenefits.join(" and ")}.`;
            
        return {
          ...project,
          explanation: explanation.replace(/\s+/g, ' ').trim(), // Clean up whitespace
          matchScore: Math.round(project.matchScore * 10) / 10 // Round score to 1 decimal
        };
      });
    }
  }
  
  export default ProjectMatcher;