import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import * as usersActions from "./features/users";
import "./App.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { UserTable } from "./components/UserTable/UserTable";

function App() {
  const { users, isUsersLoading, usersError } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  return (
    <div className="App">
      {isUsersLoading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isUsersLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!isUsersLoading && !usersError && <UserTable />}
    </div>
  );
}

export default App;
