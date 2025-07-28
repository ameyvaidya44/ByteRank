# ByteRank 🚀

ByteRank is an intelligent coding and aptitude practice platform designed for students, job seekers, and competitive programmers. It combines traditional problem-solving with AI-powered tools to enhance your debugging, learning, and preparation experience.

---

## 🌟 Key Features

### 💻 DSA Problem Solving
- Full-fledged code editor with **Run Program** and **Debug** buttons.
- The **Debug** feature (UI ready) will integrate AI to analyze:
  - User’s code
  - The given problem
  - Test case inputs & outputs
  - Suggest hints or identify logical errors (AI backend pending).
- Clean UI with syntax highlighting and a responsive layout.

### 📚 Aptitude Section
- Paginated multiple-choice questions (5 per page).
- Auto-checking on option click:
  - ✅ Correct answers highlighted in green.
  - ❌ Wrong selections in red with the correct answer shown.
- Uses dummy questions (easily replaceable via comments).

### 🌙 Theme Toggle
- Navbar switch between **Dark Mode** and **Light Mode**.
- Applies globally across:
  - Landing Page
  - Login/Signup
  - Dashboard
  - DSA Problems
  - Aptitude Pages

### 🧠 Productivity Add-ons
- **Submission History**: Track all your past attempts with timestamps (UI ready).
- **Bookmarks**: Save favorite or pending questions for review.
- **Keyboard Shortcuts** (in progress):
  - `Ctrl + Enter` → Run Code
  - `/` in editor → Focus search bar
- **Offline Access & Exporting** (in planning):
  - Download any question as PDF for offline use.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup

```bash
git clone https://github.com/ameyvaidya44/byterank.git
cd byterank
npm install
npm run dev
