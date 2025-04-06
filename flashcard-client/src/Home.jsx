import { Link } from 'react-router-dom';
import studentImage from './assets/student-illustration.png';
import './Home.css';

export default function Home() {
  return (
    <div className="main-container full-screen">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">📖 StudyGenius</div>
        <nav className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/study">Study</Link>
          <Link to="/create">
            <button className="get-started">Get Started</button>
          </Link>
        </nav>
      </header>

      {/* Centered Content */}
      <main className="content-center">
        <div className="content-layout">
          <div className="text-block">
            <h1 className="main-heading">
              Turn Your Lecture Notes into Flashcards Effortlessly
            </h1>
            <p className="subtext">
              Upload your class materials and instantly generate flashcards to improve your studying.
            </p>
            <div className="button-group">
              <Link to="/create">
                <button className="get-started">Get Started</button>
              </Link>
              <Link to="/learn-more">
                <button className="learn-more">Learn More</button>
              </Link>
            </div>
          </div>

          <div className="image-block">
            <img
              src={studentImage}
              alt="Student using a laptop"
              className="responsive-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
}