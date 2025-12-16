'use client';
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditDogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dogId = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    allergies: "",
    city: "",
    id: ""
  });

  useEffect(() => {
    const storedDogs = JSON.parse(localStorage.getItem("breedlyDogs")) || [];
    const dog = storedDogs.find(d => d.id === dogId);
    if (dog) setForm(dog);
  }, [dogId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedDogs = JSON.parse(localStorage.getItem("breedlyDogs")) || [];
    const updatedDogs = storedDogs.map(d => d.id === dogId ? form : d);
    localStorage.setItem("breedlyDogs", JSON.stringify(updatedDogs));
    router.push("/my-dog");
  };

  return (
    <div className="dog-form-page">
      <h1>Edit Dog Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Dog Name" required/>
        <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" required/>
        <input name="age" value={form.age} onChange={handleChange} type="number" placeholder="Age" required/>
        <input name="weight" value={form.weight} onChange={handleChange} type="number" placeholder="Weight (kg)" required/>
        <input name="allergies" value={form.allergies} onChange={handleChange} placeholder="Allergies"/>
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required/>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
