import "./App.css";

function App() {
  function register(e) {
    e.preventDefault();
    alert("Registration Successful!");
  }

  return (
    <>
      {/* Navigation */}
      <nav>
        <h2>College Events</h2>

        <div>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="home">
        <h1>TechFest 2026</h1>

        <p>
          Welcome to our annual college technical fest.
          Participate in exciting technical events and win prizes!
        </p>

        <p>📅 Date: October 15, 2026</p>
        <p>📍 Venue: ANITS Campus</p>
      </section>

      {/* Events */}
      <section id="events">
        <h2>Our Events</h2>

        <div className="events">
          <div>💻 Coding Challenge</div>
          <div>🧠 Technical Quiz</div>
          <div>🚀 Hackathon</div>
          <div>📄 Paper Presentation</div>
        </div>
      </section>

      {/* Registration */}
      <section className="registration">
        <h2>Student Registration</h2>

        <form onSubmit={register}>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number" required />

          <label>Department</label>
          <select required>
            <option value="">Select Department</option>
            <option>CSE</option>
            <option>CSE (AI & ML)</option>
            <option>ECE</option>
            <option>EEE</option>
          </select>

          <label>Year</label>
          <select required>
            <option value="">Select Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <label>Select Event</label>
          <select required>
            <option value="">Choose Event</option>
            <option>Coding Challenge</option>
            <option>Technical Quiz</option>
            <option>Hackathon</option>
            <option>Paper Presentation</option>
          </select>

          <label>Password</label>
          <input type="password" placeholder="Create password" required />

          <button type="submit">Register Now</button>

        </form>
      </section>

      {/* About */}
      <section id="about" className="about">
        <h2>About TechFest</h2>

        <p>
          TechFest 2026 is a college technical event where
          students can participate in coding, quizzes,
          hackathons and paper presentations.
        </p>
      </section>
    </>
  );
}

export default App;