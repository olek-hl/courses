import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Courses, CourseView } from "./containers";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseView />} />
      </Routes>
    </Router>
  );
}

export default App;
