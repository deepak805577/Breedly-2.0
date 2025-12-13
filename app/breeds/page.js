// app/breeds/page.js
"use client";
import "./breeds.css";
import { useState } from "react";
import { breedCards } from "../data/breed"; // correct import

export default function BreedsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [energyFilter, setEnergyFilter] = useState("");
  const [groomingFilter, setGroomingFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");

  const filteredBreeds = breedCards.filter((breed) => {
    const matchesSearch = breed.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (!sizeFilter || breed.size === sizeFilter) &&
      (!energyFilter || breed.energy === energyFilter) &&
      (!groomingFilter || breed.grooming === groomingFilter) &&
      (!expenseFilter || breed.expense === expenseFilter)
    );
  });

  return (
    <div className="breeds-page">
      
      {/* Background Image */}
      <div className="bg-img-wrapper">
        <img src="/assets/bgg1.png" alt="Background" />
      </div>

      {/* Heading */}
      <h1>🐾 Browse All Dog Breeds</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search breed by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          width: "100%",
          maxWidth: "300px",
          display: "block",
          margin: "0 auto 20px",
        }}
      />

      {/* Filters */}
      <div className="filters">
        <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select value={energyFilter} onChange={(e) => setEnergyFilter(e.target.value)}>
          <option value="">All Energy Levels</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <select
          value={groomingFilter}
          onChange={(e) => setGroomingFilter(e.target.value)}
        >
          <option value="">All Grooming Needs</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <select
          value={expenseFilter}
          onChange={(e) => setExpenseFilter(e.target.value)}
        >
          <option value="">Monthly Expenses Range</option>
          <option value="low">(₹1,000 – ₹3,000)</option>
          <option value="moderate">(₹3,000 – ₹5,000)</option>
          <option value="high">(₹5,000 – ₹8,000)</option>
          <option value="very high">(₹8,000 – ₹12,000)</option>
        </select>
      </div>

      {/* Breeds Grid */}
      <div className="breed-grid">
        {filteredBreeds.length === 0 ? (
          <p>No breeds match your filters.</p>
        ) : (
          filteredBreeds.map((breed) => (
            <div key={breed.name} className="breed-card">
              <img src={breed.image} alt={breed.name} />

              <h3>{breed.name}</h3>

              <p>
                Size: {breed.size}, Energy: {breed.energy}, Grooming:{" "}
                {breed.grooming}, Expense: {breed.expense}
              </p>

              <a href={`/breeds/${encodeURIComponent(breed.name)}`}>
                View Info
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
