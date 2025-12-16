'use client';

export default function DogProfileCard({ dog, onEdit }) {
  if (!dog) return null;

  return (
    <div className="dog-card">
      <h3>{dog.name}</h3>
      <p><strong>Breed:</strong> {dog.breed}</p>
      <p><strong>Age:</strong> {dog.age} years</p>
      <p><strong>Weight:</strong> {dog.weight} kg</p>
      <p><strong>Allergies:</strong> {dog.allergies || 'None'}</p>
      <p><strong>City:</strong> {dog.city}</p>
      <button className="edit-btn" onClick={() => onEdit(dog)}>
        Edit Dog 🐾
      </button>
    </div>
  );
}
