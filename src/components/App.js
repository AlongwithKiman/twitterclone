import { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; 이기만집사 {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
