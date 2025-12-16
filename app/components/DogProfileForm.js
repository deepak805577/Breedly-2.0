'use client';
import { useState, useEffect } from 'react';

export default function DogProfileForm({ dog, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    allergies: '',
    city: '',
  });

  useEffect(() => {
    if (dog) setForm(dog);
  }, [dog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="dog-form" onSubmit={handleSubmit}>
      <h2>{dog ? 'Edit Dog Profile' : 'Add Your Dog'}</h2>
      {['name','breed','age','weight','allergies','city'].map(field => (
        <div key={field} className="input-box">
          <input
            type={field === 'age' || field === 'weight' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required={field !== 'allergies'}
          />
        </div>
      ))}
      <div className="form-actions">
        <button type="submit" className="btn save">Save 🐶</button>
        <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
