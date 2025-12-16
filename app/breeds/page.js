"use client";
import "./breeds.css";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { breedCards } from "../data/breed";


export default function BreedsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [energyFilter, setEnergyFilter] = useState("");
  const [groomingFilter, setGroomingFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 700);
  return () => clearTimeout(timer);
}, []);

  const filteredBreeds = useMemo(() => {
    return breedCards.filter((breed) => {
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
  }, [searchTerm, sizeFilter, energyFilter, groomingFilter, expenseFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSizeFilter("");
    setEnergyFilter("");
    setGroomingFilter("");
    setExpenseFilter("");
  };

  return (
    <div className="breeds-page">
      {/* Background
      <div className="bg-img-wrapper">
        <img src="/assets/bgg1.png" alt="Background" />
      </div> */
}
      {/* Header */}
      <header className="breeds-header">
        <h1>🐾 Browse Dog Breeds</h1>
        <p>Explore breeds based on lifestyle, space & care needs</p>
      </header>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by breed name…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters sticky">
        <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select value={energyFilter} onChange={(e) => setEnergyFilter(e.target.value)}>
          <option value="">Energy</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <select value={groomingFilter} onChange={(e) => setGroomingFilter(e.target.value)}>
          <option value="">Grooming</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <select value={expenseFilter} onChange={(e) => setExpenseFilter(e.target.value)}>
          <option value="">Monthly Cost</option>
          <option value="low">₹1k – ₹3k</option>
          <option value="moderate">₹3k – ₹5k</option>
          <option value="high">₹5k – ₹8k</option>
          <option value="very high">₹8k+</option>
        </select>

        <button className="clear-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* Result Count */}
      <div className="results-info">
        Showing <strong>{filteredBreeds.length}</strong> breeds
      </div>

      {/* Grid */}
     <div className="breed-grid">
  {loading ? (
    Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="breed-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line small"></div>
      </div>
    ))
  ) : filteredBreeds.length === 0 ? (
    <div className="empty-state">
    <p>No breeds match your filters.</p>
       <button onClick={clearFilters}>Reset Filters</button>
          </div>
  ) : (
    filteredBreeds.map((breed) => (
      <div key={breed.name} className="breed-card">
        <img src={breed.image} alt={breed.name} />
        <h3>{breed.name}</h3>
        <p className="meta">
          Size: {breed.size}, Energy: {breed.energy}, Grooming: {breed.grooming}
        </p>
        <a href={`/breeds/${encodeURIComponent(breed.name)}`}className="view-btn">
       View Details →
        </a>
      </div>
    ))
  )}
</div>
 
    </div>
  );
}
