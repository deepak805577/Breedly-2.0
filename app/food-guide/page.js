'use client';
import "./food.css";
import { useState } from 'react';
import { breedFoodData } from "../data/food";

export default function FoodGuidePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const breeds = Object.keys(breedFoodData);
// Only match breed if user has typed something
const matchedBreed = searchTerm
  ? breeds.find(breed =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : null;


  return (
    <div>

      {/* HEADER */}
      <header className="food-header">
        <div className="food-header-content">
          <img
            src="/assets/dog eating.png"
            alt="Dog Bowl"
            className="food-dog-img"
          />
          <div className="food-text">
            <h1>🍽️ Dog Food Guide</h1>
            <p>Because every tail wag starts with the right bite 🐕</p>
          </div>
        </div>
      </header>

      {/* SEARCH SECTION */}
      <section className="breed-food-search">
        <h2>🔍 Find Feeding Tips by Breed</h2>

        <input
          type="text"
          id="breedSearch"
          placeholder="Type a breed name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="breed-result-wrapper">
          <img
            src="/assets/download-removebg-preview.png"
            alt="Peeking Puppies"
            className="puppy-top"
          />

          <div id="breedResult" className="food-result-box">
            {!matchedBreed && <p>🐾 Start typing a breed to see specific food tips!</p>}

            {matchedBreed && (
              <div>
                <h2>{matchedBreed} 🍖</h2>

                {/* Nutrient Needs */}
                <h3>📌 Nutrient Needs</h3>
                <ul>
                  {Object.entries(
                    breedFoodData[matchedBreed].nutrient_needs
                  ).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace("_", " ")}:</strong> {value}
                    </li>
                  ))}
                </ul>

                {/* Good Foods */}
                <h3>🥗 Good Foods</h3>
                {Object.entries(
                  breedFoodData[matchedBreed].good_foods
                ).map(([category, items]) => (
                  <div key={category}>
                    <h4>{category.toUpperCase()}</h4>
                    <ul>
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Daily Portions */}
                <h3>🍱 Daily Portions</h3>

                <h4>Adult</h4>
                <p>
                  Meals per day:{" "}
                  {breedFoodData[matchedBreed].daily_portions.adult.meals_per_day}
                </p>
                <p>
                  Amount:{" "}
                  {breedFoodData[matchedBreed].daily_portions.adult.amount}
                </p>
                <ul>
                  {breedFoodData[matchedBreed].daily_portions.adult.example.map(
                    (ex, i) => (
                      <li key={i}>{ex}</li>
                    )
                  )}
                </ul>

                <h4>Puppy</h4>
                <p>
                  Meals per day:{" "}
                  {breedFoodData[matchedBreed].daily_portions.puppy.meals_per_day}
                </p>
                <p>{breedFoodData[matchedBreed].daily_portions.puppy.note}</p>

                {/* Foods to Avoid */}
                <h3>❌ Foods to Avoid</h3>
                <ul>
                  {breedFoodData[matchedBreed].foods_to_avoid.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>

                {/* Routine Care */}
                <h3>🩺 Routine Care</h3>
                {Object.entries(
                  breedFoodData[matchedBreed].routine_care
                ).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace("_", " ")}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                ))}

                {/* Recipes */}
                <h3>🍳 Easy Recipes</h3>
                {breedFoodData[matchedBreed].recipes.map((recipe, i) => (
                  <div className="recipe-box" key={i}>
                    <h4>{recipe.title}</h4>
                    <strong>Ingredients:</strong>
                    <ul>
                      {recipe.ingredients.map((ing, j) => (
                        <li key={j}>{ing}</li>
                      ))}
                    </ul>
                    <strong>Instructions:</strong>
                    <ul>
                      {recipe.instructions.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Notes */}
                <h3>📝 Notes</h3>
                <ul>
                  {breedFoodData[matchedBreed].notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOD CARDS SECTION */}
      <section className="food-section">
        <div className="food-card">
          <div className="icon">🥩</div>
          <h3>Protein</h3>
          <p>Dogs thrive on a protein-rich diet from meats like chicken, fish, or eggs. Adjust % to breed, age & activity.</p>
        </div>
        <div className="food-card">
          <div className="icon">🥗</div>
          <h3>Balanced Diet</h3>
          <p>Include carbs (rice, oats), veggies, and fiber for digestion. Tailor portions to size & health.</p>
        </div>
        <div className="food-card">
          <div className="icon">🚫</div>
          <h3>Foods to Avoid</h3>
          <p>Never feed chocolate, onions, grapes, or excess human treats. Watch for allergies!</p>
        </div>
        <div className="food-card">
          <div className="icon">🥕</div>
          <h3>Healthy Treats</h3>
          <p>Use carrot sticks, apple slices, or boiled eggs for guilt-free rewards. Avoid sugary treats.</p>
        </div>
        <div className="food-card">
          <div className="icon">💧</div>
          <h3>Hydration</h3>
          <p>Fresh, clean water should always be available. Hydration is key for digestion and health.</p>
        </div>
        <div className="food-card">
          <div className="icon">📏</div>
          <h3>Portion Control</h3>
          <p>Measure meals. Overfeeding causes obesity. Stick to a schedule & adjust as your dog ages.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-note">
        <p>BreedLy © 2025 — Happy Tummies, Happy Tails 🐶</p>
        <p>🍖 Crafted with care for every hungry pup!</p>
      </footer>
    </div>
  );
}
