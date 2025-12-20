"use client";
import "./breed.css";
import { useParams, useRouter } from "next/navigation";
import { breeds } from "../../data/breeds";
import { useState } from "react";


export default function BreedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [videoError, setVideoError] = useState(false);

  const breedName = decodeURIComponent(params.breed)
    .replace(/-/g, " ")
    .trim()
    .toLowerCase(); 
     // ✔ Find in object instead of array
  const breedKey = Object.keys(breeds).find(
    (b) => b.trim().toLowerCase() === breedName
  );
  const breed = breeds[breedKey];

  if (!breed) {
    return (
      <div className="breed-info" style={{ padding: "20px", textAlign: "center" }}>
        <h1>Breed Not Found</h1>
        <p>Try going back and selecting again.</p>
      </div>
    );
  }
  return (
    <div className="breed-detail-page">
      {/* Background */}
     { /*<div className="bg-image-wrapper">
        <img src="/assets/bgg1.png" alt="Dog background" />
      </div>
}
      {/* Breed Info Container */}
      <div className="breed-info">
     <section className="breed-hero">
  <img src={breed.image} alt={breedKey} />
  <div>
    <h1>{breedKey}</h1>
    <p className="tagline">{breed.bestFor}</p>
  </div>
</section>

        {/* Description */}
        <div className="desc">
          <h2>Description</h2>
          <p>{breed.description}</p>
        </div>
   
        {/* Traits */}
        {breed.traits && (
          <div className="traits">
            <h2>Key Traits</h2>
            <ul>{breed.traits.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        )}

        {/* Pros & Cons */}
        {breed.pros && breed.cons && (
          <div className="pros-cons">
            <h2>Pros</h2>
            <ul>{breed.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>

            <h2>Cons</h2>
            <ul>{breed.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}

        {/* Grooming */}
        {breed.grooming && (
          <div className="grooming">
            <h2>Grooming Needs</h2>
            <ul>{breed.grooming.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
        )}

        {/* Exercise */}
        {breed.exercise && (
          <div className="exercise">
            <h2>Daily Exercise</h2>
            <p>{breed.exercise}</p>
          </div>
        )}

        {/* Notes */}
        {breed.notes && (
          <div className="notes">
            <h2>Special Notes</h2>
            <ul>{breed.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>
        )}

        {/* Lifespan */}
        {breed.lifespan && (
          <div className="lifespan">
            <h2>Average Lifespan</h2>
            <p>{breed.lifespan}</p>
          </div>
        )}

        {/* Best For */}
        {breed.bestFor && (
          <div className="bestfor">
            <h2>Best For</h2>
            <p>{breed.bestFor}</p>
          </div>
        )}
<p className="health-disclaimer">
  ⚠️ Health information is for educational purposes only and not a substitute for veterinary advice.
</p>

        {/* Health Guide */}
    {breed.healthAwareness && (
  <section className="health-awareness">
    <h2>🩺 Health Awareness</h2>

    {breed.healthAwareness.commonIssues && (
      <>
        <h3>Common Health Concerns</h3>
        <ul>
          {breed.healthAwareness.commonIssues.map((issue, i) => (
            <li key={i}>
              <strong>{issue.name}:</strong> {issue.note}
            </li>
          ))}
        </ul>
      </>
    )}

    {breed.healthAwareness.preventionTips && (
      <>
        <h3>General Prevention Tips</h3>
        <ul>
          {breed.healthAwareness.preventionTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </>
    )}

    <p className="health-disclaimer">
      ⚠️ {breed.healthAwareness.disclaimer}
    </p>
  </section>
)}

      </div>

      
    {/* Video Section */}
{breed.video && !videoError && (
  <div className="video-section">
    <h2>🎥 Watch this Breed in Action!</h2>
    <video
      controls
      playsInline
      onError={() => setVideoError(true)} // auto-remove on failure
    >
      <source src={breed.video} type="video/mp4" />
    </video>
  </div>
)}


      {/* Fun Facts */}
      {breed.funFacts && (
        <div className="fun-facts">
          <h2>🐾 Fun Facts About This Breed!</h2>
          <ul>{breed.funFacts.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}

      {/* <div className="back-link">
        <a href="/results" className="back-link">← Back to results</a>
        <a href="/breeds" className="back-link">← Back to All Breeds</a>

      
      </div> */}
      
      <section className="next-steps">
  <h2>🐾 What’s the Next Step?</h2>
  <p>
    Choosing a dog is a long-term commitment. Let’s help you decide responsibly.
  </p>

  <div className="step-actions">
    <button onClick={() => router.push('/adoption-guide')}>
      🏡 Adoption Checklist
    </button>
  </div>
</section>

     

      {/* Dog Quote */}
      <div className="dog-quote-banner">
        🐶 Every dog is a story waiting to be loved. 🐾
      </div>
    </div>
  );
}
