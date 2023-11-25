// import "./App.css";
// import Profile from "./Components/Profile/Profile";
// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
// import Form from "./Components/Form/Form";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// function App() {
//   const [userstate, setUserState] = useState({});
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               userstate && userstate._id ? (
//                 <>
//                   <Profile
//                     setUserState={setUserState}
//                     username={userstate.fname}
//                   />
//                   <Form />
//                 </>
//               ) : (
//                 <Login setUserState={setUserState} />
//               )
//             }
//           ></Route>
//           <Route
//             path="/login"
//             element={<Login setUserState={setUserState} />}
//           ></Route>
//           <Route path="/signup" element={<Register />}></Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Form from "./Components/Form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userstate, setUserState] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowForm(true);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userstate && userstate._id ? (
                <>
                  <Profile
                    setUserState={setUserState}
                    username={userstate.fname}
                  />
                  {showForm && <Form className="show" />}
                </>
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
