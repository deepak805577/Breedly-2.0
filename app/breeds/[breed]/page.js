"use client";
import "./breed.css";
import { useParams } from "next/navigation";
import { breeds } from "../../data/breeds";

export default function BreedDetailPage() {
  const params = useParams();
  const breedName = decodeURIComponent(params.breed)
    .replace(/-/g, " ")
    .trim()
    .toLowerCase(); 
     // ✔ Find in object instead of array
  const breed = breeds[Object.keys(breeds).find(
    (b) => b.trim().toLowerCase() === breedName
  )];

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
      <div className="bg-image-wrapper">
        <img src="/assets/bgg1.png" alt="Dog background" />
      </div>

      {/* Breed Info Container */}
      <div className="breed-info">
        <img src={breed.image} alt={breed.name} />

        <h1>{breed.name}</h1>

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

        {/* Health Guide */}
        {breed.healthGuide && (
          <div className="health-guide">
            <h2>Health Guide</h2>
            <p><strong>Lifespan:</strong> {breed.healthGuide.lifespan}</p>

            {breed.healthGuide.common_health_issues && (
              <>
                <h3>Common Health Issues:</h3>
                <ul>
                  {breed.healthGuide.common_health_issues.map((issue, i) => (
                    <li key={i}>
                      <strong>{issue.issue}:</strong> {issue.description}<br />
                      <em>Tip:</em> {issue.tip}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {breed.healthGuide.preventive_care && (
              <>
                <h3>Preventive Care:</h3>
                <ul>
                  <li>
                    <strong>Vaccinations:</strong> {breed.healthGuide.preventive_care.vaccinations.join(", ")}
                  </li>
                  <li>
                    <strong>Deworming:</strong> Puppies: {breed.healthGuide.preventive_care.deworming.puppies}, Adults: {breed.healthGuide.preventive_care.deworming.adults}
                  </li>
                  <li>
                    <strong>Tick & Flea:</strong> {breed.healthGuide.preventive_care.tick_flea_control}
                  </li>
                  <li>
                    <strong>Spay/Neuter:</strong> {breed.healthGuide.preventive_care.spay_neuter}
                  </li>
                  <li>
                    <strong>Annual Vet Checks:</strong> {breed.healthGuide.preventive_care.annual_vet_checks.join(", ")}
                  </li>
                </ul>
              </>
            )}

            {breed.healthGuide.diet && (
              <>
                <h3>Diet Recommendations:</h3>
                <ul>
                  <li>Protein: {breed.healthGuide.diet.protein}</li>
                  <li>Fat: {breed.healthGuide.diet.fat}</li>
                  <li>Carbs: {breed.healthGuide.diet.carbs}</li>
                  <li>Fiber: {breed.healthGuide.diet.fiber}</li>
                  <li><strong>Good Foods:</strong> {breed.healthGuide.diet.good_foods.join(", ")}</li>
                  <li><strong>Treats:</strong> {breed.healthGuide.diet.treats}</li>
                  <li><strong>Hydration:</strong> {breed.healthGuide.diet.hydration}</li>
                </ul>
              </>
            )}

            {breed.healthGuide.exercise && (
              <>
                <h3>Daily Exercise:</h3>
                <p><strong>Walks:</strong> {breed.healthGuide.exercise.daily_walks}</p>
                <p><strong>Play:</strong> {breed.healthGuide.exercise.play.join(", ")}</p>
                <p><strong>Training:</strong> {breed.healthGuide.exercise.training}</p>
              </>
            )}

            {breed.healthGuide.grooming && (
              <>
                <h3>Grooming Routine:</h3>
                <ul>
                  <li>Brushing: {breed.healthGuide.grooming.brushing}</li>
                  <li>Bathing: {breed.healthGuide.grooming.bathing}</li>
                  <li>Ear Cleaning: {breed.healthGuide.grooming.ear_cleaning}</li>
                  <li>Nail Clipping: {breed.healthGuide.grooming.nail_clipping}</li>
                  <li>Dental Care: {breed.healthGuide.grooming.dental_care}</li>
                </ul>
              </>
            )}

            {breed.healthGuide.wellbeing_tips && (
              <>
                <h3>Wellbeing Tips:</h3>
                <ul>{breed.healthGuide.wellbeing_tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
              </>
            )}

            <p><strong>Golden Rule:</strong> {breed.healthGuide.golden_rule}</p>
          </div>
        )}
      </div>

      {/* Video Section */}
      {breed.video && (
        <div className="video-section">
          <h2>🎥 Watch this Breed in Action!</h2>
          <video controls playsInline>
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
     

      {/* Dog Quote */}
      <div className="dog-quote-banner">
        🐶 Every dog is a story waiting to be loved. 🐾
      </div>
    </div>
  );
}
