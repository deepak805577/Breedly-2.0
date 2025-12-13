'use client';
import './results.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { breeds } from '../data/breeds'; // keep this if you have a separate breeds list


// Breed matching profiles (from your results.html)

 const breedProfiles = {
  "Labrador Retriever": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "3+ hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Labrador Retriever.jpg",
    desc: "Friendly, playful, and always ready for family fun."
  },
  "Golden Retriever": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "3+ hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Golden Retriever.webp",
    desc: "Loyal, gentle, and perfect for active families with kids."
  },
  "German Shepherd": {
    traits: ["House", "Yes", "Spacious", "Open field", "Yes - Teenagers", "13+", "Yes", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Protective", "Some barking", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/German Shepherd.jpg",
    desc: "Intelligent and loyal — great for security and companionship."
  },
  "Beagle": {
    traits: ["2-3BHK", "Yes", "Moderate", "Small yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Beagle.jpg",
    desc: "Curious, merry, and loves to sniff out fun with kids."
  },
  "Pug": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "7–14kg", "Weekly", "Very important"],
    image: "/assets/Dogs/Pug.jpg",
    desc: "Charming and comical — perfect for apartment life."
  },
  "Shih Tzu": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "7–14kg", "Daily", "Very important"],
    image: "/assets/Dogs/Shih Tzu.jpg",
    desc: "Affectionate lapdog — loves pampering and cuddles."
  },
  "Lhasa Apso": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Independent", "Prefer quiet", "Prefer trained", "7–14kg", "Daily", "Very important"],
    image: "/assets/Dogs/Lhasa Apso.jpg",
    desc: "Small, loyal, and full of personality — great for apartments."
  },
  "Pomeranian": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Very playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Very important"],
    image: "/assets/Dogs/Pomeranian.jpg",
    desc: "Fluffy, energetic, and full of charm — loves attention."
  },
  "Indian Spitz": {
    traits: ["2-3BHK", "Yes", "Moderate", "Small yard", "No", "0–5", "Yes", "Yes", "1–2 hours", "2–5 hrs", "No", "Moderate", "Moderately playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Indian Spitz.jpg",
    desc: "Lively and intelligent — perfect family companion for Indian homes."
  },
  "Dachshund": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "No", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Moderately playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Very important"],
    image: "/assets/Dogs/Dachshund.jpg",
    desc: "Bold and curious — tiny but full of personality."
  },
  "Cocker Spaniel": {
    traits: ["2-3BHK", "Yes", "Moderate", "Moderate", "Yes - Ages 6–12", "6–12", "Yes", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Cocker Spaniel.jpg",
    desc: "Sweet-natured, loves cuddles and playtime."
  },
  "Boxer": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "Yes", "No", "2–3 hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Boxer.jpg",
    desc: "Energetic, fun-loving, and protective family clown."
  },
  "Doberman Pinscher": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "Yes", "No", "3+ hours", "< 2 hrs", "Yes", "Very Active", "Moderately playful", "Protective", "Some barking", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Doberman Pinscher.jpg",
    desc: "Alert, loyal, and brave — needs structure and exercise."
  },
  "Rottweiler": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "Yes", "No", "2–3 hours", "< 2 hrs", "Yes", "Moderate", "Moderately playful", "Protective", "Some barking", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Rottweiler.jpg",
    desc: "Confident and strong — devoted guardian for experienced owners."
  },
  "Great Dane": {
    traits: ["House", "Yes", "Spacious", "Open yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "2–3 hours", "< 2 hrs", "Yes", "Moderate", "Low energy", "Calm", "Some barking", "Just the basics", "50kg+", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Great Dane.jpg",
    desc: "Gentle giant — affectionate and easy-going."
  },
  "Saint Bernard": {
    traits: ["House", "Yes", "Spacious", "Open yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "1–2 hours", "< 2 hrs", "Yes", "Low", "Low energy", "Calm", "Prefer quiet", "Just the basics", "50kg+", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Saint Bernard.jpg",
    desc: "Patient and gentle — loves kids and cold weather."
  }
  , "Siberian Husky": {
    traits: ["House", "Yes", "Spacious", "Open field", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Independent", "Loud & frequent", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Siberian Husky.jpg",
    desc: "Adventurous and vocal — best for active families with space."
  },
  "Alaskan Malamute": {
    traits: ["House", "Yes", "Spacious", "Open field", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Independent", "Loud & frequent", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Alaskan Malamute.jpg",
    desc: "Strong, hardy, loves snow — needs space and activity."
  },
  "French Bulldog": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "7–14kg", "Weekly", "Very important"],
    image: "/assets/Dogs/French Bulldog.jpg",
    desc: "Easy-going and comical — loves apartment life."
  },
  "English Bulldog": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/English Bulldog.jpg",
    desc: "Chilled-out and loving — great for relaxed homes."
  },
  "Bullmastiff": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "1–2 hours", "< 2 hrs", "Yes", "Low", "Low energy", "Protective", "Prefer quiet", "Just the basics", "50kg+", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Bullmastiff.jpg",
    desc: "Loyal guardian — calm, brave, and protective."
  },
  "Pit Bull Terrier": {
    traits: ["House", "Yes", "Spacious", "Moderate yard", "Yes - Teenagers", "13+", "No", "No", "2–3 hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Protective", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Pit Bull Terrier.jpg",
    desc: "Energetic, loyal, and loving — needs strong leadership."
  },
  "American Bully": {
    traits: ["House", "Yes", "Spacious", "Moderate yard", "Yes - Teenagers", "13+", "No", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Protective", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/American Bully.jpg",
    desc: "Friendly and sturdy — great companion with proper training."
  },
  "Maltese": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "7kg & under", "Daily", "Very important"],
    image: "/assets/Dogs/Maltese.jpg",
    desc: "Tiny, loving, hypoallergenic — perfect lapdog for small spaces."
  },
  "Chihuahua": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Independent", "Loud & frequent", "Prefer trained", "7kg & under", "Weekly", "Very important"],
    image: "/assets/Dogs/Chihuahua.jpg",
    desc: "Small but bold — big personality in a tiny package!"
  },
  "Yorkshire Terrier": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Independent", "Some barking", "Prefer trained", "7kg & under", "Daily", "Very important"],
    image: "/assets/Dogs/Yorkshire Terrier.jpg",
    desc: "Tiny, clever, and charming — loves attention and pampering."
  },
  "Miniature Pinscher": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "No", "Yes", "< 1 hour", "2–5 hrs", "No", "Moderate", "Very playful", "Independent", "Some barking", "Just the basics", "7kg & under", "Weekly", "Very important"],
    image: "/assets/Dogs/Miniature Pinscher.jpg",
    desc: "Tiny, brave, and energetic — loves to explore and play."
  },
  "Poodle": {
    traits: ["Apartment", "Yes", "Moderate", "Small yard", "No", "0–5", "Yes", "Yes", "1–2 hours", "2–5 hrs", "No", "Low", "Moderately playful", "Friendly", "Some barking", "A lot — I enjoy it", "7–14kg", "Daily", "Very important"],
    image: "/assets/Dogs/Poodle.jpg",
    desc: "Smart, hypoallergenic, and stylish — easy to train."
  },
  "Dalmatian": {
    traits: ["House", "Yes", "Spacious", "Large yard", "No", "0–5", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Independent", "Some barking", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Dalmatian.jpg",
    desc: "Spotted, energetic, and fun-loving — loves open spaces."
  },
  "English Cocker Spaniel": {
    traits: ["2-3BHK", "Yes", "Moderate", "Moderate yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "7–14kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Cocker Spaniel.jpg",
    desc: "Happy and cheerful — loves playtime and cuddles."
  },
  "English Setter": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "2–3 hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/English Setter.jpg",
    desc: "Gentle, friendly, and energetic — loves big yards."
  },
  "Basset Hound": {
    traits: ["Apartment", "Yes", "Very little", "Small yard", "No", "0–5", "No", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Low energy", "Calm", "Prefer quiet", "Prefer trained", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Basset Hound.jpg",
    desc: "Laid-back with adorable droopy ears — calm and loyal."
  },
  "Boston Terrier": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "2–5 hrs", "No", "Low", "Moderately playful", "Friendly", "Prefer quiet", "Prefer trained", "7–14kg", "Weekly", "Very important"],
    image: "/assets/Dogs/Boston Terrier.jpg"
  },
  "Border Collie": {
    traits: ["House", "Yes", "Spacious", "Open field", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Friendly", "Loud & frequent", "A lot — I enjoy it", "14–23kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Border Collie.jpg",
    desc: "Super smart and energetic — loves tasks and big spaces."
  },
  "Belgian Malinois": {
    traits: ["House", "Yes", "Spacious", "Open field", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "< 2 hrs", "Yes", "Very Active", "Very playful", "Protective", "Loud & frequent", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Beligan Malinois.jpg",
    desc: "Brilliant and loyal — best for experienced, active families."
  },
  "Irish Setter": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Irish Setter.jpg",
    desc: "Joyful and playful — needs space to run and explore."
  },
  "Weimaraner": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Protective", "Some barking", "A lot — I enjoy it", "23–50kg", "Weekly", "Not important"],
    image: "/assets/Dogs/Weimaraner.jpg",
    desc: "Sleek, loyal, and adventurous — loves outdoor activities."
  },
  "Afghan Hound": {
    traits: ["House", "Yes", "Spacious", "Moderate yard", "No", "0–5", "No", "No", "2–3 hours", "2–5 hrs", "No", "Moderate", "Calm", "Independent", "Prefer quiet", "Just the basics", "23–50kg", "Daily", "Somewhat"],
    image: "/assets/Dogs/Afghan Hound.jpg",
    desc: "Elegant and graceful — independent spirit with stunning looks."
  },
  "Bichon Frise": {
    traits: ["Apartment", "Yes", "Very little", "None", "No", "0–5", "Yes", "Yes", "< 1 hour", "< 2 hrs", "No", "Low", "Moderately playful", "Friendly", "Prefer quiet", "Prefer trained", "7–14kg", "Daily", "Very important"],
    image: "/assets/Dogs/Bichon Frise.jpg",
    desc: "Happy, hypoallergenic fluffball — perfect for allergy sufferers."
  },
  "Rough Collie": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Ages 6–12", "6–12", "Yes", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Protective", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Rough Collie.jpg",
    desc: "Loyal and gentle — loves kids and watching over the family."
  },
  "Samoyed": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "2–5 hrs", "Yes", "Very Active", "Very playful", "Friendly", "Some barking", "A lot — I enjoy it", "23–50kg", "Daily", "Somewhat"],
    image: "/assets/Dogs/Samoyed.jpg",
    desc: "Fluffy and friendly — loves people and cold weather."
  },
  "Newfoundland Dog": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Ages 0–5", "0–5", "Yes", "No", "1–2 hours", "2–5 hrs", "Yes", "Low", "Calm", "Friendly", "Prefer quiet", "Just the basics", "50kg+", "Weekly", "Somewhat"],
    image: "/assets/Dogs/NewFoundland Dog.jpg",
    desc: "Gentle giant — calm, loving, and great with kids."
  },
  "Bull Terrier": {
    traits: ["House", "Yes", "Moderate", "Moderate yard", "Yes - Teenagers", "13+", "No", "No", "1–2 hours", "2–5 hrs", "Yes", "Moderate", "Very playful", "Friendly", "Some barking", "Just the basics", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Bull Terrier.jpg",
    desc: "Bold and fun-loving — always ready to play."
  },
  "Shar Pei": {
    traits: ["House", "Yes", "Moderate", "Small yard", "No", "0–5", "No", "No", "< 1 hour", "< 2 hrs", "No", "Low", "Calm", "Protective", "Prefer quiet", "Prefer trained", "23–50kg", "Weekly", "Somewhat"],
    image: "/assets/Dogs/Shar Pei.jpg",
    desc: "Loyal and calm — famous for unique wrinkles."
  },
  "Dogo Argentino": {
    traits: ["House", "Yes", "Spacious", "Large yard", "Yes - Teenagers", "13+", "No", "No", "3+ hours", "< 2 hrs", "Yes", "Very Active", "Protective", "Protective", "Some barking", "A lot — I enjoy it", "50kg+", "Weekly", "Not important"],
    image: "/assets/Dogs/Dogo Argentino.jpg",
    desc: "Powerful and loyal — needs experienced owners and open space."
  }
};


export default function ResultsPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallbackText, setFallbackText] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Try both sessionStorage and localStorage (some versions of your code used both keys)
    const raw =
      sessionStorage.getItem('quizAnswers') ||
      localStorage.getItem('breedlyAnswers') ||
      localStorage.getItem('quizAnswers');

    if (!raw) {
      setFallbackText('Oops! No quiz answers found. Please take the quiz again.');
      setLoading(false);
      return;
    }

    let answers;
    try {
      answers = JSON.parse(raw);
      if (!Array.isArray(answers)) throw new Error('Answers should be an array');
    } catch (err) {
      console.error('Failed to parse quiz answers:', err);
      setFallbackText('There was a problem reading your quiz answers. Please retake the quiz.');
      setLoading(false);
      return;
    }

    // Match breeds based on answers
    let scored = [];
    Object.entries(breedProfiles).forEach(([breedName, profile]) => {
      let score = 0;
      profile.traits.forEach(trait => {
        if (answers.includes(trait)) score++;
      });
      if (score > 0) {
        const percent = Math.round((score / profile.traits.length) * 100);
        // Try to find a richer breed object from imported 'breeds' (if available)
        const found = Array.isArray(breeds) ? breeds.find(b => b.name === breedName) : undefined;
        scored.push({
          name: breedName,
          score,
          percent,
          image: found?.image || profile.image,
          description: found?.description || profile.desc || profile.description || '',
        });
      }
    });

    if (scored.length === 0) {
      setFallbackText('😔 Sorry, no matches found. Try adjusting your answers and retake the quiz.');
      setLoading(false);
      return;
    }

    // Sort by percent first, then raw score
    scored.sort((a, b) => {
      if (b.percent !== a.percent) return b.percent - a.percent;
      return b.score - a.score;
    });

    // Take top 3 unique matches
    setMatches(scored.slice(0, 3));
    setLoading(false);
  }, []);

  function restartQuiz() {
    // Clear both storage keys just in case; navigate back to quiz
    try {
      sessionStorage.removeItem('quizAnswers');
      localStorage.removeItem('breedlyAnswers');
      localStorage.removeItem('quizAnswers');
    } catch (e) {
      // ignore
    }
    router.push('/breed-selector'); // update route to your quiz route
  }

  function openBreed(breedName) {
    // open breed info page (if using dynamic route)
    const url = `/breeds/${encodeURIComponent(breedName)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="results-page">
      <img src="/assets/images/bggg.jpg" alt="Background" className="bg-image" />

      <header className="results-header">
        <h1>🐾 Your Perfect Pup Matches!</h1>
        <p className="slogan">Handpicked for you based on your lifestyle 🐶💛</p>
        <p className="quote">“The better I get to know men, the more I find myself loving dogs.” – Charles de Gaulle</p>
      </header>

      <section className="results-body">
        <div className="dog-cards" id="resultsContainer">
          {loading ? (
            <p className="fallback">Loading your matches...</p>
          ) : matches.length === 0 ? (
            <p className="fallback">{fallbackText}</p>
          ) : (
            matches.map((m) => (
              <article className="dog-card" key={m.name}>
                <img src={m.image} alt={m.name} />
                <div className="card-content">
                  <h3>{m.name}</h3>
                  <p className="match-percent">{m.percent}% match</p>
                  <p className="desc">{m.description}</p>
                  <div className="card-actions">
                    <button
                      className="link-btn"
                      onClick={() => openBreed(m.name)}
                      aria-label={`View full info about ${m.name}`}
                    >
                      View Full Info
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <footer className="btn-bar">
        <button className="restart-btn" onClick={restartQuiz}>🔁 Retake the Quiz</button>
      </footer>
    </main>
  );
}