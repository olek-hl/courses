import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Courses } from "./containers";

function App() {
  // useEffect(() => {
  //   fetch("https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions")
  //     .then((res) => res.json())
  //     .then((res) =>
  //       fetch("https://api.wisey.app/api/v1/core/preview-courses", {
  //         headers: { Authorization: `Bearer ${res.token}` },
  //       })
  //     );
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<div>test</div>} />
      </Routes>
    </Router>
  );
}

export default App;
