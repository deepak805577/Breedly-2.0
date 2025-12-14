'use client';
import './results.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { breeds } from '../data/breeds'; // keep this if you have a separate breeds list

// Breed matching profiles (from your results.html)
const breedProfiles = {
  "Labrador Retriever": {
    traits: ["House","Spacious","Large yard","Yes","Ages 6–12","Yes","No","No","3+ hours","1–2 hours","< 2 hrs","Yes","Very active","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Labrador Retriever.jpg",
    desc: "Friendly, playful, and always ready for family fun."
  },
  "Golden Retriever": {
    traits: ["House","Spacious","Large yard","Yes","Ages 6–12","Yes","No","No","3+ hours","1–2 hours","< 2 hrs","Yes","Very active","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Golden Retriever.webp",
    desc: "Loyal, gentle, and perfect for active families with kids."
  },
  "German Shepherd": {
    traits: ["House","Spacious","Open field","Yes","Teenagers 13+","Yes","No","No","3+ hours","2+ hours","< 2 hrs","Yes","Very active","Very playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Not important"],
    image: "/assets/Dogs/German Shepherd.jpg",
    desc: "Intelligent and loyal — great for security and companionship."
  },
  "Beagle": {
    traits: ["2-3BHK","Moderate","Small yard","Yes","Ages 6–12","Yes","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Friendly","Some barking","Just the basics","No","Medium (7–14kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Beagle.jpg",
    desc: "Curious, merry, and loves to sniff out fun with kids."
  },
  "Pug": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","Yes","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Small (7kg & under)","Weekly","Very important"],
    image: "/assets/Dogs/Pug.jpg",
    desc: "Charming and comical — perfect for apartment life."
  },
  "Shih Tzu": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","Yes","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Small (7kg & under)","Daily","Very important"],
    image: "/assets/Dogs/Shih Tzu.jpg",
    desc: "Affectionate lapdog — loves pampering and cuddles."
  },
  "Lhasa Apso": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","Yes","Low","Low energy","Independent","Prefer quiet","Just the basics","Yes","Small (7kg & under)","Daily","Very important"],
    image: "/assets/Dogs/Lhasa Apso.jpg",
    desc: "Small, loyal, and full of personality — great for apartments."
  },
  "Pomeranian": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","Yes","Moderate","Very playful","Friendly","Some barking","Just the basics","Yes","Small (7kg & under)","Weekly","Very important"],
    image: "/assets/Dogs/Pomeranian.jpg",
    desc: "Fluffy, energetic, and full of charm — loves attention."
  },
  "Indian Spitz": {
    traits: ["2-3BHK","Moderate","Small yard","No","0–5","Yes","Yes","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Moderately playful","Friendly","Some barking","Just the basics","No","Medium (7–14kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Indian Spitz.jpg",
    desc: "Lively and intelligent — perfect family companion for Indian homes."
  },
  "Dachshund": {
    traits: ["Apartment","Very little","None","No","0–5","No","Yes","No","< 1 hour","< 30 mins","2–5 hrs","Yes","Low","Moderately playful","Friendly","Some barking","Just the basics","No","Small (7kg & under)","Weekly","Very important"],
    image: "/assets/Dogs/Dachshund.jpg",
    desc: "Bold and curious — tiny but full of personality."
  },
  "Cocker Spaniel": {
    traits: ["2-3BHK","Moderate","Moderate yard","Yes","Ages 6–12","Yes","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Friendly","Some barking","Just the basics","No","Medium (7–14kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Cocker Spaniel.jpg",
    desc: "Sweet-natured, loves cuddles and playtime."
  },
  "Boxer": {
    traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","Yes","No","No","2–3 hours","1–2 hours","2–5 hrs","Yes","Very active","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Boxer.jpg",
    desc: "Energetic, fun-loving, and protective family clown."
  },
  "Doberman Pinscher": {
    traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","Yes","No","No","3+ hours","1–2 hours","< 2 hrs","Yes","Very active","Moderately playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Not important"],
    image: "/assets/Dogs/Doberman Pinscher.jpg",
    desc: "Alert, loyal, and brave — needs structure and exercise."
  },
  "Rottweiler": {
    traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","Yes","No","No","2–3 hours","1–2 hours","< 2 hrs","Yes","Moderate","Moderately playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Not important"],
    image: "/assets/Dogs/Rottweiler.jpg",
    desc: "Confident and strong — devoted guardian for experienced owners."
  },
  "Great Dane": {
    traits: ["House","Spacious","Open yard","Yes","Ages 6–12","Yes","No","No","2–3 hours","1–2 hours","< 2 hrs","Yes","Moderate","Low energy","Calm","Some barking","Just the basics","No","Very Large (50kg+)","Weekly","Somewhat"],
    image: "/assets/Dogs/Great Dane.jpg",
    desc: "Gentle giant — affectionate and easy-going."
  },
  "Saint Bernard": {
    traits: ["House","Spacious","Open yard","Yes","Ages 6–12","Yes","No","No","1–2 hours","1–2 hours","< 2 hrs","Yes","Low","Low energy","Calm","Prefer quiet","Just the basics","No","Very Large (50kg+)","Weekly","Somewhat"],
    image: "/assets/Dogs/Saint Bernard.jpg",
    desc: "Patient and gentle — loves kids and cold weather."
  },
  "Siberian Husky": {
    traits: ["House","Spacious","Open field","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Independent","Loud & frequent","A lot — I enjoy it","No","Large (23–50kg)","Weekly","Not important"],
    image: "/assets/Dogs/Siberian Husky.jpg",
    desc: "Adventurous and vocal — best for active families with space."
  }
   ,
  "Alaskan Malamute": {
    traits: ["House","Spacious","Open field","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Independent","Loud & frequent","A lot — I enjoy it","No","Large (23–50kg)","Weekly","Not important"],
    image: "/assets/Dogs/Alaskan Malamute.jpg",
    desc: "Strong, hardy, loves snow — needs space and activity."
  },
  "French Bulldog": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Small (7kg & under)","Weekly","Very important"],
    image: "/assets/Dogs/French Bulldog.jpg",
    desc: "Easy-going and comical — loves apartment life."
  },
  "English Bulldog": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Medium (7–14kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/English Bulldog.jpg",
    desc: "Chilled-out and loving — great for relaxed homes."
  },
  "Bullmastiff": {
    traits: ["House","Spacious","Large yard","No","Teenagers 13+","No","No","No","1–2 hours","1–2 hours","< 2 hrs","Yes","Low","Low energy","Protective","Prefer quiet","Just the basics","No","Very Large (50kg+)","Weekly","Somewhat"],
    image: "/assets/Dogs/Bullmastiff.jpg",
    desc: "Loyal guardian — calm, brave, and protective."
  },
  "Pit Bull Terrier": {
    traits: ["House","Spacious","Moderate yard","No","Teenagers 13+","No","No","No","2–3 hours","1–2 hours","2–5 hrs","Yes","Very active","Very playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/Pit Bull Terrier.jpg",
    desc: "Energetic, loyal, and loving — needs strong leadership."
  },
  "American Bully": {
    traits: ["House","Spacious","Moderate yard","No","Teenagers 13+","No","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
    image: "/assets/Dogs/American Bully.jpg",
    desc: "Friendly and sturdy — great companion with proper training."
  },
  "Maltese": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Small (7kg & under)","Daily","Very important"],
    image: "/assets/Dogs/Maltese.jpg",
    desc: "Tiny, loving, hypoallergenic — perfect lapdog for small spaces."
  },
  "Chihuahua": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Independent","Loud & frequent","Just the basics","Yes","Small (7kg & under)","Weekly","Very important"],
    image: "/assets/Dogs/Chihuahua.jpg",
    desc: "Small but bold — big personality in a tiny package!"
  },
  "Yorkshire Terrier": {
    traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Independent","Some barking","Just the basics","Yes","Small (7kg & under)","Daily","Very important"],
    image: "/assets/Dogs/Yorkshire Terrier.jpg",
    desc: "Tiny, clever, and charming — loves attention and pampering."
  }
,
"Miniature Pinscher": {
  traits: ["Apartment","Very little","None","No","0–5","No","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Moderate","Very playful","Independent","Some barking","Just the basics","Yes","Small (7kg & under)","Weekly","Very important"],
  image: "/assets/Dogs/Miniature Pinscher.jpg",
  desc: "Tiny, brave, and energetic — loves to explore and play."
},
"Poodle": {
  traits: ["Apartment","Moderate","Small yard","No","0–5","Yes","Yes","No","1–2 hours","1–2 hours","2–5 hrs","No","Low","Moderately playful","Friendly","Some barking","A lot — I enjoy it","Yes","Medium (7–14kg)","Daily","Very important"],
  image: "/assets/Dogs/Poodle.jpg",
  desc: "Smart, hypoallergenic, and stylish — easy to train."
},
"Dalmatian": {
  traits: ["House","Spacious","Large yard","No","0–5","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Independent","Some barking","A lot — I enjoy it","No","Large (23–50kg)","Weekly","Not important"],
  image: "/assets/Dogs/Dalmatian.jpg",
  desc: "Spotted, energetic, and fun-loving — loves open spaces."
},
"English Cocker Spaniel": {
  traits: ["2-3BHK","Moderate","Moderate yard","Yes","Ages 6–12","Yes","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Friendly","Some barking","Just the basics","No","Medium (7–14kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/English Cocker Spaniel.jpg",
  desc: "Happy and cheerful — loves playtime and cuddles."
},
"English Setter": {
  traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","No","No","No","2–3 hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/English Setter.jpg",
  desc: "Gentle, friendly, and energetic — loves big yards."
},
"Basset Hound": {
  traits: ["Apartment","Very little","Small yard","No","0–5","No","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Low energy","Calm","Prefer quiet","Just the basics","Yes","Medium-Large (14–23kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/Basset Hound.jpg",
  desc: "Laid-back with adorable droopy ears — calm and loyal."
},
"Boston Terrier": {
  traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","2–5 hrs","No","Low","Moderately playful","Friendly","Prefer quiet","Just the basics","Yes","Medium (7–14kg)","Weekly","Very important"],
  image: "/assets/Dogs/Boston Terrier.jpg",
  desc: "Friendly, playful, and perfect for apartment living."
},
"Border Collie": {
  traits: ["House","Spacious","Open field","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Friendly","Loud & frequent","A lot — I enjoy it","No","Medium-Large (14–23kg)","Weekly","Not important"],
  image: "/assets/Dogs/Border Collie.jpg",
  desc: "Super smart and energetic — loves tasks and big spaces."
},
"Belgian Malinois": {
  traits: ["House","Spacious","Open field","Yes","Teenagers 13+","No","No","No","3+ hours","< 2 hrs","2–5 hrs","Yes","Very active","Very playful","Protective","Loud & frequent","A lot — I enjoy it","No","Large (23–50kg)","Weekly","Not important"],
  image: "/assets/Dogs/Belgian Malinois.jpg",
  desc: "Brilliant and loyal — best for experienced, active families."
},
"Irish Setter": {
  traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Not important"],
  image: "/assets/Dogs/Irish Setter.jpg",
  desc: "Joyful and playful — needs space to run and explore."
},
"Weimaraner": {
  traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Protective","Some barking","A lot — I enjoy it","No","Large (23–50kg)","Weekly","Not important"],
  image: "/assets/Dogs/Weimaraner.jpg",
  desc: "Sleek, loyal, and adventurous — loves outdoor activities."
},
"Afghan Hound": {
  traits: ["House","Moderate","Moderate yard","No","0–5","No","No","No","2–3 hours","1–2 hours","2–5 hrs","No","Moderate","Calm","Independent","Prefer quiet","Just the basics","No","Large (23–50kg)","Daily","Somewhat"],
  image: "/assets/Dogs/Afghan Hound.jpg",
  desc: "Elegant and graceful — independent spirit with stunning looks."
},
"Bichon Frise": {
  traits: ["Apartment","Very little","None","No","0–5","Yes","Yes","No","< 1 hour","< 30 mins","< 2 hrs","No","Low","Moderately playful","Friendly","Prefer quiet","Just the basics","Yes","Medium (7–14kg)","Daily","Very important"],
  image: "/assets/Dogs/Bichon Frise.jpg",
  desc: "Happy, hypoallergenic fluffball — perfect for allergy sufferers."
},
"Rough Collie": {
  traits: ["House","Spacious","Large yard","Yes","Ages 6–12","Yes","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Protective","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/Rough Collie.jpg",
  desc: "Loyal and gentle — loves kids and watching over the family."
},
"Samoyed": {
  traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","No","No","No","3+ hours","2+ hours","2–5 hrs","Yes","Very active","Very playful","Friendly","Some barking","A lot — I enjoy it","No","Large (23–50kg)","Daily","Somewhat"],
  image: "/assets/Dogs/Samoyed.jpg",
  desc: "Fluffy and friendly — loves people and cold weather."
},
"Newfoundland Dog": {
  traits: ["House","Spacious","Large yard","Yes","Ages 0–5","Yes","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Low","Calm","Friendly","Prefer quiet","Just the basics","No","Very Large (50kg+)","Weekly","Somewhat"],
  image: "/assets/Dogs/Newfoundland Dog.jpg",
  desc: "Gentle giant — calm, loving, and great with kids."
},
"Bull Terrier": {
  traits: ["House","Moderate","Moderate yard","Yes","Teenagers 13+","No","No","No","1–2 hours","1–2 hours","2–5 hrs","Yes","Moderate","Very playful","Friendly","Some barking","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/Bull Terrier.jpg",
  desc: "Bold and fun-loving — always ready to play."
},
"Shar Pei": {
  traits: ["House","Moderate","Small yard","No","0–5","No","No","No","< 1 hour","< 2 hrs","2–5 hrs","No","Low","Calm","Protective","Prefer quiet","Just the basics","No","Large (23–50kg)","Weekly","Somewhat"],
  image: "/assets/Dogs/Shar Pei.jpg",
  desc: "Loyal and calm — famous for unique wrinkles."
},
"Dogo Argentino": {
  traits: ["House","Spacious","Large yard","Yes","Teenagers 13+","No","No","No","3+ hours","< 2 hrs","2–5 hrs","Yes","Very active","Protective","Protective","Some barking","A lot — I enjoy it","No","Very Large (50kg+)","Weekly","Not important"],
  image: "/assets/Dogs/Dogo Argentino.jpg",
  desc: "Powerful and loyal — needs experienced owners and open space."
}

};

export default function ResultsPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallbackText, setFallbackText] = useState('');
  const router = useRouter();
  const [animated, setAnimated] = useState(false);


  useEffect(() => {
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

    let scored = [];
    Object.entries(breedProfiles).forEach(([breedName, profile]) => {
      let score = 0;
      profile.traits?.forEach(trait => {
        if (answers.includes(trait)) score++;
      });
      if (score > 0) {
        const percent = Math.round((score / (profile.traits?.length || 1)) * 100);
        const found = Array.isArray(breeds) ? breeds.find(b => b.name === breedName) : undefined;
        scored.push({
          name: breedName,
          score,
          percent,
          image: found?.image || profile.image,
          description: found?.description || profile.desc || profile.description || '',
          traits: found?.traits || profile.traits || [],
          pros: found?.pros || profile.pros || [],
          cons: found?.cons || profile.cons || [],
          grooming: found?.grooming || profile.grooming || [],
          notes: found?.notes || profile.notes || [],
        });
      }
    });

    if (scored.length === 0) {
      setFallbackText('😔 Sorry, no matches found. Try adjusting your answers and retake the quiz.');
      setLoading(false);
      return;
    }

    scored.sort((a, b) => b.percent !== a.percent ? b.percent - a.percent : b.score - a.score);
    setMatches(scored.slice(0, 3));
    setLoading(false);
    setTimeout(() => setAnimated(true), 100);
  }, []);

  function restartQuiz() {
    try {
      sessionStorage.removeItem('quizAnswers');
      localStorage.removeItem('breedlyAnswers');
      localStorage.removeItem('quizAnswers');
    } catch (e) {}
    router.push('/breed-selector');
  }

  function openBreed(breedName) {
    const url = `/breeds/${encodeURIComponent(breedName)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="results-page">
      

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
            matches.map(breed => (
              <article className="dog-card" key={breed.name}>
                <img src={breed.image} alt={breed.name} />
                <div className="card-content">
                  <h3>{breed.name}</h3>
                 <div className="match-bar-container">
  <div className="match-bar-bg">
    <div
      className="match-bar-fill"
      style={{
        width: animated ? `${breed.percent}%` : '0%',
        transition: 'width 1s ease-in-out',
      }}
    />
  </div>
  <p className="match-percent-text">{breed.percent}% match</p>
</div>

                  <p className="desc">{breed.description}</p>


                  {/* Pros */}
                  {breed.pros?.length > 0 && (
                    <ul className="pros">
                      {breed.pros.slice(0, 3).map((p, i) => <li key={i}>✅ {p}</li>)}
                    </ul>
                  )}

                  {/* Cons */}
                  {breed.cons?.length > 0 && (
                    <ul className="cons">
                      {breed.cons.slice(0, 3).map((c, i) => <li key={i}>⚠️ {c}</li>)}
                    </ul>
                  )}

                  {/* Grooming */}
                  {breed.grooming?.length > 0 && (
                    <ul className="grooming">
                      {breed.grooming.slice(0, 3).map((g, i) => <li key={i}>🧴 {g}</li>)}
                    </ul>
                  )}

                  {/* Notes */}
                  {breed.notes?.length > 0 && (
                    <ul className="notes">
                      {breed.notes.slice(0, 3).map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                  )}

                  <div className="card-actions">
                    <button
                      className="link-btn"
                      onClick={() => openBreed(breed.name)}
                      aria-label={`View full info about ${breed.name}`}
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