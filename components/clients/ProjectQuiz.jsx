import React, { useState, useEffect } from 'react';
import ProjectMatcher from './ProjectMatcher.jsx';
import ProjectCard from '../projects/projectCard';
import { RotateCcw } from 'lucide-react';

const questions = [
  {
    id: 1,
    question:
      'What are the biggest pain points in your current organization that technology could address?',
    options: [
      'Difficulties in delivering core programs/services efficiently',
      'Inefficiencies in administrative or operational processes',
      'Limited capacity to measure impact and data collection',
      'Difficulty in engaging and expanding the community',
    ],
  },
  {
    id: 2,
    question: 'What is your current technology capacity?',
    options: [
      'No technology in place',
      'Basic tools in place (e.g. spreadsheets)',
      'Using third-party digital platforms (e.g., CRM, fundraising tools)',
      'Well-established tech infrastructure but requiring specialized solutions',
    ],
  },
  {
    id: 3,
    question: 'What outcomes would you hope to achieve with improved technology?',
    options: [
      'Increased number of people served',
      'Reduced administrative burden',
      'Improved data quality for impact reporting',
      'Enhanced stakeholder communication and engagement',
    ],
  },
];

const UserInfoForm = ({ onSubmit, onSkip }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
    nonprofitName: '',
    nonprofitWebsite: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <div className="user-info-form">
      <h3>Tell Us About Your Nonprofit</h3>
      <p>
        Help us understand who we're assisting so we can better support your nonprofit's needs —
        your recommendation will appear right after.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Your Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={userInfo.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nonprofitName">Nonprofit Name</label>
          <input
            type="text"
            id="nonprofitName"
            name="nonprofitName"
            value={userInfo.nonprofitName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nonprofitWebsite">Nonprofit's Website</label>
          <input
            type="url"
            id="nonprofitWebsite"
            name="nonprofitWebsite"
            value={userInfo.nonprofitWebsite}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="skip-btn" onClick={onSkip}>
            Skip
          </button>
        </div>
      </form>

      <style jsx>{`
        .user-info-form {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .submit-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          flex: 1;
        }

        .skip-btn {
          background: #f1f3f5;
          color: #495057;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #0056b3;
        }

        .skip-btn:hover {
          background: #e9ecef;
        }
      `}</style>
    </div>
  );
};

const Quiz = ({ projects }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textAnswers, setTextAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [recommendedProject, setRecommendedProject] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Initialize ProjectMatcher with the imported data
  const projectMatcher = new ProjectMatcher(projects);

  // Check if it's the first time the user is taking the quiz
  useEffect(() => {
    const hasCompletedQuiz = localStorage.getItem('hasCompletedQuiz');
    if (hasCompletedQuiz) {
      setIsFirstTime(true);
    }
  }, []);

  const handleAnswer = (index) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });

    setTextAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = questions[currentQuestion].options[index];
      return newAnswers;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      processResults();
    }
  };

  const processResults = () => {
    const results = projectMatcher.findMatches(answers);

    // Add explanations to the top matches
    const matchesWithExplanations = projectMatcher.generateMatchExplanations(
      [results.topMatch, ...results.alternativeMatches],
      answers,
    );

    // Set the recommended project
    setRecommendedProject(matchesWithExplanations[0]);

    // If it's the first time, show the user form, otherwise show results
    if (isFirstTime) {
      setShowUserForm(true);
    } else {
      setShowResults(true);
    }
  };

  const handleUserInfoSubmit = async (userInfo) => {
    try {
      // Save user data to MongoDB
      const response = await fetch('/api/saveQuizData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo,
          quizAnswers: textAnswers,
          recommendedProject: recommendedProject.title,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save user data');
      }

      // Mark as completed in localStorage
      localStorage.setItem('hasCompletedQuiz', 'true');

      // Show results
      setShowUserForm(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error saving user data:', error);
      // Show results anyway even if save fails
      setShowUserForm(false);
      setShowResults(true);
    }
  };

  const handleSkipForm = () => {
    // Mark as completed in localStorage even if skipped
    localStorage.setItem('hasCompletedQuiz', 'true');

    // Show results
    setShowUserForm(false);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setShowUserForm(false);
    setRecommendedProject(null);
  };

  if (showUserForm) {
    return <UserInfoForm onSubmit={handleUserInfoSubmit} onSkip={handleSkipForm} />;
  }

  if (showResults) {
    return (
      <div className="results-container">
        <h3>Explore How Hack4Impact Has Solved Similar Challenges!</h3>
        <p>
          Based on your responses, here are projects that have tackled similar issues in the past.
        </p>
        <div className="recommendations">
          {recommendedProject && (
            <div>
              <ProjectCard
                title={recommendedProject.title}
                description={recommendedProject.description}
                thumbnail={recommendedProject.thumbnail}
                urlSlug={recommendedProject.urlSlug}
              />

              <div className="explanation">
                <p>{recommendedProject.explanation}</p>
              </div>
            </div>
          )}
        </div>
        <button className="restart-btn flex items-center gap-2" onClick={resetQuiz}>
          <RotateCcw size={18} />
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-card">
        <h3>{questions[currentQuestion].question}</h3>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} className="option-btn" onClick={() => handleAnswer(index)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .quiz-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .progress-bar {
          height: 4px;
          background: #e9ecef;
          border-radius: 2px;
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: var(--primary-blue);
          transition: width 0.3s ease;
        }

        .question-card {
          margin-bottom: 2rem;
        }

        .options {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .option-btn {
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          background: white;
          text-align: left;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .option-btn:hover {
          border-color: var(--primary-blue);
          background: #f8f9fa;
        }

        .results-container {
          text-align: center;
          padding: 2rem;
        }

        .recommendations {
          display: grid;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .restart-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .restart-btn:hover {
          background: #0056b3;
        }

        .explanation {
          background: #f8f9fa;
          border-left: 4px solid var(--primary-blue);
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          text-align: left;
        }

        .explanation p {
          margin: 0;
          line-height: 1.6;
          color: #495057;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
