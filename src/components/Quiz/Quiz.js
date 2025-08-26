import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "Which blockchain represents the future of digital sovereignty?",
      options: [
        { text: "Ethereum", value: "ethereum", correct: false },
        { text: "Solana", value: "solana", correct: true }
      ]
    },
    {
      id: 2,
      question: "What system of governance does The Oracle decree?",
      options: [
        { text: "Centralization", value: "centralization", correct: false },
        { text: "Decentralization", value: "decentralization", correct: true }
      ]
    },
    {
      id: 3,
      question: "What path leads to the SuperState?",
      options: [
        { text: "Government Control", value: "government", correct: false },
        { text: "Digital Freedom", value: "freedom", correct: true }
      ]
    }
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Check if all answers are correct
      const allCorrect = questions.every((q, index) => 
        q.options.find(opt => opt.value === newAnswers[index])?.correct
      );
      
      if (allCorrect) {
        // Save quiz completion to cookie
        const superstateData = {
          quizPassed: true,
          quizDate: new Date().toISOString()
        };
        
        // Save to cookie
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `superstate_citizen=${encodeURIComponent(JSON.stringify(superstateData))}; expires=${expires}; path=/`;
        
        navigate('/join-success');
      } else {
        navigate('/manifesto', { 
          state: { 
            quizFailed: true, 
            message: "You do not understand our ideology. Read the prophecy again and redo the quiz when you have gained wisdom." 
          }
        });
      }
    }
  };

  const returnToManifesto = () => {
    navigate('/manifesto');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">INITIATING INITIATION PROTOCOL...</div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Return Button */}
      <div className="return-button" onClick={returnToManifesto}>
        <span className="glitch">◀ RETURN TO MANIFESTO</span>
      </div>

      <div className="container">
        <div className="terminal-header">
          <span className="glitch">exec /sacred/initiation/SUPERSTATE_TEST.py</span>
        </div>

        {/* ASCII Art Header */}
        <div className="ascii-art">
{`╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ████████╗███████╗███████╗████████╗    ██████╗ ███████╗                ║
║    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝   ██╔═══██╗██╔════╝                ║
║       ██║   █████╗  ███████╗   ██║      ██║   ██║█████╗                  ║
║       ██║   ██╔══╝  ╚════██║   ██║      ██║   ██║██╔══╝                  ║
║       ██║   ███████╗███████║   ██║      ╚██████╔╝██║                     ║
║       ╚═╝   ╚══════╝╚══════╝   ╚═╝       ╚═════╝ ╚═╝                     ║
║                                                                          ║
║           I N I T I A T I O N   P R O T O C O L                         ║
╚══════════════════════════════════════════════════════════════════════════╝`}
        </div>

        <div className="quiz-content">
          <div className="progress-bar">
            <div className="progress-text">
              QUESTION {currentQuestion + 1} OF {questions.length}
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-container scan-line">
            <h2 className="question-title">
              The Oracle Tests Your Understanding:
            </h2>
            
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>

            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(option.value)}
                >
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>

            <div className="oracle-message">
              <p><em>"Choose wisely, mortal. The Oracle sees your true nature through your answers."</em></p>
              <p>- Pufiya, Prophet of The Oracle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;