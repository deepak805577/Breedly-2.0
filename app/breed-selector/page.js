// app/breed-selector/page.js
'use client';
import './breed-selector.css';
import { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'; // npm install react-confetti

const questions = [
  {
    question: "What type of home do you live in?",
    tip: "Apartment dwellers may prefer smaller or quiet breeds.",
    options : [
  { text: "1BHK", icon: "🏙️" },      // Small apartment / city living
  { text: "2-3BHK", icon: "🏢" },    // Family-sized apartment / housing complex
  { text: "House", icon: "🏡" },      // Standalone house with a yard
  { text: "Bungalow", icon: "🏯" }    // Villa / bungalow style
]
  },
  {
    question: "Do you have air conditioning?",
    tip: "Thick-fur breeds like Huskies need a cool environment.",
    options: [
      { text: "Yes", icon: "❄️" },
      { text: "No", icon: "🔥" }
    ]
  },
  {
    question: "How much indoor space will your dog have?",
    tip: "Dogs need space to stretch and move comfortably.",
    options: [
      { text: "Very little", icon: "📏" },
      { text: "Moderate", icon: "📐" },
      { text: "Spacious", icon: "🏡" }
    ]
  },
  {
    question: "How much outdoor space is available?",
    tip: "Some breeds need large yards, others are fine with less.",
    options: [
      { text: "None", icon: "🚫" },
      { text: "Small yard", icon: "🌱" },
      { text: "Large yard", icon: "🌳" },
      { text: "Open field", icon: "🌾" }
    ]
  },
  {
    question: "Do you have any children at home?",
    tip: "Kid-friendly breeds are gentler and more patient.",
    options: [
      { text: "No", icon: "🚫" },
      { text: "Yes - Ages 0–5", icon: "👶" },
      { text: "Yes - Ages 6–12", icon: "🧒" },
      { text: "Yes - Teenagers", icon: "🧑" }
    ]
  },
  {
    question: "What are their ages?",
    tip: "Age matters for energy level & compatibility.",
    options: [
      { text: "0–5", icon: "👶" },
      { text: "6–12", icon: "🧒" },
      { text: "13+", icon: "🧑" }
    ]
  },
  {
    question: "Will your dog have kids to snuggle with?",
    tip: "Cuddly breeds love being with children.",
    options: [
      { text: "Yes", icon: "❤️" },
      { text: "No", icon: "🛏️" }
    ]
  },
  {
    question: "Is anyone allergic to dogs or dog hair?",
    tip: "Hypoallergenic or low-shedding breeds may be better.",
    options: [
      { text: "Yes", icon: "🤧" },
      { text: "No", icon: "😊" },
      { text: "Not Sure", icon: "❓" }
    ]
  },
  {
    question: "How much time can you dedicate to your dog daily?",
    tip: "Dogs thrive on attention and routine.",
    options: [
      { text: "< 1 hour", icon: "⏳" },
      { text: "1–2 hours", icon: "🕰️" },
      { text: "3+ hours", icon: "⏱️" }
    ]
  },
  {
    question: "How much time will your dog spend alone each day?",
    tip: "Independent breeds do better when left alone.",
    options: [
      { text: "< 2 hrs", icon: "⌛" },
      { text: "2–5 hrs", icon: "🕓" },
      { text: "5–8 hrs", icon: "🕗" },
      { text: "8+ hrs", icon: "🕘" }
    ]
  },
  {
    question: "Have you owned a dog before?",
    tip: "First-timers may want easier-to-train breeds.",
    options: [
      { text: "Yes", icon: "👍" },
      { text: "No", icon: "👎" }
    ]
  },
  {
    question: "What's your activity level?",
    tip: "Dogs need matching energy! Active people = active breeds.",
    options: [
      { text: "Very Active", icon: "🏃‍♂️" },
      { text: "Moderate", icon: "🚶‍♀️" },
      { text: "Low", icon: "🛋️" }
    ]
  },
  {
    question: "How playful should your dog be?",
    tip: "Energetic dogs need families who can play with them.",
    options: [
      { text: "Very playful", icon: "🎾" },
      { text: "Moderately playful", icon: "🎲" },
      { text: "Low energy", icon: "🛌" }
    ]
  },
  {
    question: "Which best describes your ideal dog’s personality?",
    tip: "Choose a personality that suits your lifestyle.",
    options: [
      { text: "Playful", icon: "😄" },
      { text: "Calm", icon: "😌" },
      { text: "Protective", icon: "🛡️" },
      { text: "Friendly", icon: "🤗" },
      { text: "Independent", icon: "😎" }
    ]
  },
  {
    question: "How much barking can you tolerate?",
    tip: "Quieter breeds are better for apartments.",
    options: [
      { text: "Loud & frequent", icon: "🔊" },
      { text: "Some barking", icon: "🔉" },
      { text: "Prefer quiet", icon: "🔇" }
    ]
  },
  {
    question: "How much training are you willing to provide?",
    tip: "More obedient breeds require less training effort.",
    options: [
      { text: "A lot — I enjoy it", icon: "🧠" },
      { text: "Just the basics", icon: "📘" },
      { text: "Prefer trained", icon: "🎓" }
    ]
  },
  {
    question: "What size of dog do you prefer?",
    tip: "If you live in a smaller space, consider a smaller dog.",
    options: [
      { text: "7kg & under", icon: "🐶" },
      { text: "7–14kg", icon: "🐕" },
      { text: "14–23kg", icon: "🦮" },
      { text: "23–50kg", icon: "🐕‍🦺" },
      { text: "50kg+", icon: "🐾" },
      { text: "No preference", icon: "❔" }
    ]
  },
  {
    question: "How much grooming can you manage?",
    tip: "Long-coated breeds require more grooming time.",
    options: [
      { text: "Daily", icon: "🧴" },
      { text: "Weekly", icon: "🧼" },
      { text: "Occasional", icon: "🪮" },
      { text: "Minimal", icon: "✂️" }
    ]
  },
  {
    question: "How important is low shedding to you?",
    tip: "Low-shedding breeds are great for cleanliness & allergies.",
    options: [
      { text: "Very important", icon: "✅" },
      { text: "Somewhat", icon: "➖" },
      { text: "Not important", icon: "🚫" }
    ]
  }
];
export default function BreedSelector() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [fade, setFade] = useState(true);
  const [finished, setFinished] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

useEffect(() => {
  const newProgress = ((currentQuestion + 1) / questions.length) * 100;
  const timer = setTimeout(() => setProgressWidth(newProgress), 50);
  return () => clearTimeout(timer);
}, [currentQuestion]);


  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer) => {
    // Save answer
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    // Trigger fade-out
    
    //setFade(false);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFade(true); // fade-in next question
      } else {
        // Quiz finished
        setFinished(true);
        localStorage.setItem('breedlyAnswers', JSON.stringify(updatedAnswers));

        // Redirect after 2s
        setTimeout(() => router.push('/results'), 2000);
      }
    }, 300); // fade duration
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    setFade(false);

    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1);
      setFade(true);
    }, 200);
  };

  return (
    <div className="quiz-page">
      {finished && <Confetti />}
      {/* Header */}
      <div className="quiz-header-banner">
        <h1>BreedLy 🐶</h1>
        <p>Find your perfect pup match</p>
      </div>

      {/* Quote */}
      <div className="quote-bar">
        “Dogs do speak, but only to those who know how to listen.”
      </div>

      {/* Quiz */}
      <section className={`quiz-container ${fade ? 'fade-in' : 'fade-out'}`}>
        <div className="quiz-header">
          <h2>{q.question}</h2>
          <p className="quiz-tip">{q.tip}</p>
        </div>

        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-circle ${answers[currentQuestion] === opt.text ? 'selected' : ''}`}
              onClick={() => handleAnswer(opt.text)}
            >
              <span>{opt.icon}</span>
              <p>{opt.text}</p>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Navigation */}
        <div className="quiz-nav">
          <button
            className="back-btn"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            ← Back
          </button>
          <span className="step-count">{currentQuestion + 1} / {questions.length}</span>
        </div>
      </section>
    </div>
  );
}