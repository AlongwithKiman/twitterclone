import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);

  const [userObject, setUserObject] = useState(null);
  useEffect(() => {}, [
    authService.onAuthStateChanged((user) => {
      setUserObject(user);
      // 감지가 됐다 : 적어도 firebase가 init을 함

      setInit(true);
    }),
  ]);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObject)} userObject={userObject} />
      ) : (
        "initializing ...."
      )}
      <footer style={{ fontSize: "1px" }}>
        &copy; 이기만집사 {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default App;
