import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import * as usersActions from "./features/users";
import "./App.css";

function App() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  return <div className="App">User Table</div>;
}

export default App;
