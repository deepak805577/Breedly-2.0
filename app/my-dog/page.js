"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./my-dog.css";
import { breedCards } from "@/app/data/breed";

export default function MyDogPage() {
  const [dogs, setDogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Load dogs from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("breedlyDogs")) || [];
    setDogs(stored);
  }, []);

  // Delete dog
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this dog profile?")) {
      const updatedDogs = dogs.filter((dog) => dog.id !== id);
      setDogs(updatedDogs);
      localStorage.setItem("breedlyDogs", JSON.stringify(updatedDogs));
    }
  };

  // Start editing
  const startEdit = (dog) => {
    setEditingId(dog.id);
    setEditData({ ...dog });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Save edits
  const saveEdit = () => {
    const updatedDogs = dogs.map((dog) =>
      dog.id === editingId ? editData : dog
    );
    setDogs(updatedDogs);
    localStorage.setItem("breedlyDogs", JSON.stringify(updatedDogs));
    setEditingId(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <main className="my-dog-page">
      <header className="my-dog-header">
        <h1>🐾 My Dogs</h1>
        <p>Your personalized dog profiles</p>
      </header>

      {dogs.length === 0 ? (
        <div className="empty-state">
          <p>You haven’t added any dogs yet.</p>
          <Link href="/my-dog/add" className="primary-btn">
            + Add Your Dog
          </Link>
        </div>
      ) : (
        <>
          <div className="dog-grid">
            {dogs.map((dog) => (
              <div key={dog.id} className="dog-card">
                {editingId === dog.id ? (
                  <div className="edit-form">
                     <label>
                              Dog Name
                              <input
                                type="text"
                                name="name"
                                required
                                value={editData.name}
                                onChange={handleChange}
                              />
                            </label>
                    
                            <label>
                              Breed
                              <select
                                name="breed"
                                required
                                value={editData.breed}
                                onChange={handleChange}
                              >
                                <option value="">Select breed</option>
                                {breedCards.map((b) => (
                                  <option key={b.name} value={b.name}>
                                    {b.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                    
                            <div className="row">
                              <label>
                                Age (years)
                                <input
                                  type="number"
                                  step="0.1"
                                  name="age"
                                  required
                                  value={editData.age}
                                  onChange={handleChange}
                                />
                              </label>
                    
                              <label>
                                Weight (kg)
                                <input
                                  type="number"
                                  step="0.1"
                                  name="weight"
                                  required
                                  value={editData.weight}
                                  onChange={handleChange}
                                />
                              </label>
                            </div>
                    
                            <label>
                              Allergies (if any)
                              <input
                                type="text"
                                name="allergies"
                                placeholder="e.g. Chicken, grains"
                                value={editData.allergies}
                                onChange={handleChange}
                              />
                            </label>
                    
                            <label>
                              City
                              <input
                                type="text"
                                name="city"
                                required
                                value={editData.city}
                                onChange={handleChange}
                              />
                            </label>
        

                    <div className="card-actions">
                      <button onClick={saveEdit} className="secondary-btn">
                        💾 Save
                      </button>
                      <button onClick={cancelEdit} className="delete-btn">
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{dog.name}</h3>
                    <p className="breed">{dog.breed}</p>
                    <ul className="dog-meta">
                      <li>🎂 Age: {dog.age} yrs</li>
                      <li>⚖️ Weight: {dog.weight} kg</li>
                      {dog.allergies && <li>🚫 Allergies: {dog.allergies}</li>}
                      <li>📍 City: {dog.city}</li>
                    </ul>
                    <div className="card-actions">
                      <button
                        onClick={() => startEdit(dog)}
                        className="secondary-btn edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dog.id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                      <Link
                        href={`/food-guide?dog=${dog.id}`}
                        className="secondary-btn"
                      >
                        🍖 Food Guide
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="add-more">
            <Link href="/my-dog/add" className="primary-btn">
              + Add Another Dog
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
