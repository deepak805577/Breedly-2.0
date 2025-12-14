'use client';
import { useState } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

  const handleToggle = (type) => setIsRegister(type === 'register');

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') setLoginData({ ...loginData, [name]: value });
    else setRegisterData({ ...registerData, [name]: value });
  };
  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        alert(`Welcome ${data.username}! You are logged in.`);

        // Redirect to home page
        router.push('');
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

// REGISTER
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  cache: "no-store",
  body: JSON.stringify({
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
  })
});

    const data = await res.json();
    if (res.ok) {
      alert("Registration Successful!");
      setIsRegister(false);
    } else alert(data.error);

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <div className={`login-page container ${isRegister ? 'active' : ''}`}>

      {/* LOGIN FORM */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => handleChange(e, 'login')}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => handleChange(e, 'login')}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="forgot-link">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn">Login</button>
          <p>or Login with social platforms</p>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </form>
      </div>

      {/* REGISTER FORM */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => handleChange(e, 'register')}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => handleChange(e, 'register')}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => handleChange(e, 'register')}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn">Register</button>
          <p>or Register with social platforms</p>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </form>
      </div>

      {/* TOGGLE PANEL */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Friend!</h1>
          <p>Don't have an account?</p>
          <button type="button" className="btn register-btn" onClick={() => handleToggle('register')}>
            Register
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to access all site features</p>
          <button type="button" className="btn login-btn" onClick={() => handleToggle('login')}>
            Login
          </button>
        </div>
      </div>

    </div>
  );
}
