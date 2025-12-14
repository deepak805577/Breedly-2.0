"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home fade-in">
      {/* HERO */}
      <section className="hero">
  <div className="hero-content fade-in">
    <h1>
      Find the Right Dog.<br />
      Care for Them the Right Way 🐾
    </h1>
    <p>
      Breedly helps you choose the perfect dog breed and guides you
      with food, health, and training — responsibly.
    </p>

    <div className="hero-actions fade-in">
  <Link href="/breed-selector" className="btn-primary">
    Find My Ideal Dog 🐕
  </Link>

  <Link href="/breeds" className="btn-secondary">
    Browse Breeds
  </Link>
</div>

    
  </div>
</section>

<section className="why-choose fade-in">
  <h2 className="section-title">Why Dog Owners Choose Breedly</h2>

  <div className="grid-3">
    <div className="card">
      <h3>Right Breed Match</h3>
      <p>We help you choose a dog that fits your lifestyle, space, and energy.</p>
    </div>

    <div className="card">
      <h3>Responsible Care</h3>
      <p>Food, health, and training guides designed by breed needs.</p>
    </div>

    <div className="card">
      <h3>Trusted Information</h3>
      <p>No myths. No confusion. Just clear, practical guidance.</p>
    </div>
  </div>
</section>
   {/* FEATURE STRIP */}
      <section className="features fade-in">
        <div className="feature">
          🧠 <strong>Breed Knowledge</strong>
          <span>Temperament, care & lifestyle fit</span>
        </div>
        <div className="feature">
          🐕 <strong>Responsible Choices</strong>
          <span>Adoption & ownership guidance</span>
        </div>
        <div className="feature">
          ❤️ <strong>Dog-First</strong>
          <span>Every decision starts with wellbeing</span>
        </div>
      </section>


<section className="how-breedly fade-in">
  <h2 className="section-title">How Breedly Works</h2>

  <div className="grid-3">
    <div className="card">
      <strong>1</strong>
      <h3>Answer Simple Questions</h3>
      <p>Tell us about your home, activity level, and experience.</p>
    </div>

    <div className="card">
      <strong>2</strong>
      <h3>Get Breed Matches</h3>
      <p>We recommend breeds that suit you best.</p>
    </div>

    <div className="card">
      <strong>3</strong>
      <h3>Learn & Care</h3>
      <p>Access food, health, and training guides for your dog.</p>
    </div>
  </div>
</section>

   
     {/* HOW BREEDLY HELPS YOU */}
<section className="how-links fade-in">
  <h2 className="section-title">How Breedly Helps You</h2>

  <div className="how-list">
    <Link href="/breeds" className="how-item">
      <span className="how-index">1</span>
      <div>
        <h3>Explore Breeds</h3>
        <p>Learn about temperament, care needs, and lifestyle fit.</p>
      </div>
    </Link>

    <Link href="/breed-selector" className="how-item">
      <span className="how-index">2</span>
      <div>
        <h3>Use Breed Selector</h3>
        <p>Answer a few questions to find breeds that suit you.</p>
      </div>
    </Link>

    <Link href="/breeds" className="how-item">
      <span className="how-index">3</span>
      <div>
        <h3>Make Informed Choices</h3>
        <p>Choose responsibly with dog wellbeing in mind.</p>
      </div>
    </Link>
  </div>
</section>


      {/* EXPLORE */}
      <section className="explore fade-in">
        <h2>Explore Popular Breeds</h2>
        <p>Learn what makes each breed unique before you decide.</p>

        <div className="explore-actions">
          <Link href="/breeds" className="btn-outline">
            View All Breeds →
          </Link>
        </div>
      </section>


      {/* WHO IT'S FOR */}
<section className="who-for fade-in">
  <h2>Breedly Is For</h2>

  <div className="who-grid">
    <div>🏡 First-time dog parents</div>
    <div>👨‍👩‍👧 Families choosing responsibly</div>
    <div>🐾 Adoption-focused dog lovers</div>
    <div>🧠 People who value informed care</div>
  </div>
</section>


{/* TRUST NOTE */}
<section className="trust-note fade-in">
  <p>
    Breedly promotes responsible dog ownership. All information is
    educational and encourages adoption-first, wellbeing-focused decisions.
  </p>
</section>


      {/* CTA */}
      <section className="cta fade-in">
        <h2>Not sure which breed suits you?</h2>
        <p>
          Answer a few simple questions and we’ll guide you.
        </p>
        <Link href="/breed-selector" className="btn-primary">
          Start Breed Selector
        </Link>
        
        <p className="hero-trust">
  ✔ Trusted by responsible dog lovers • ✔ No forced adoption
</p>

      </section>
      
    </div>
  );
}