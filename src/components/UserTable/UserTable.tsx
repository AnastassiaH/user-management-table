import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FilterKeys, filterSlice } from "../../features/filter";
import { IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo, useRef } from "react";

const tableColumns: FilterKeys[] = ["name", "userName", "email", "phone"];

export const UserTable: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);
  const inputRef = useRef<HTMLInputElement>();
  const { name, userName, email, phone, active } = useAppSelector(
    (state) => state.filter
  );
  const dispatch = useAppDispatch();
  const setActive = (column: FilterKeys) => {
    dispatch(filterSlice.actions.setActive(column));
  };
  const setName = (name: string) => {
    dispatch(filterSlice.actions.setName(name));
  };
  const setUserName = (userName: string) => {
    dispatch(filterSlice.actions.setUserName(userName));
  };
  const setEmail = (email: string) => {
    dispatch(filterSlice.actions.setEmail(email));
  };
  const setPhone = (phone: string) => {
    dispatch(filterSlice.actions.setPhone(phone));
  };

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  const removeActiveColumn = (
    event: React.MouseEvent<HTMLTableCellElement>
  ) => {
    if (event.currentTarget === event.target) {
      setActive("");
    }
  };
  const setActiveColumnValue = (column: FilterKeys, value: string) => {
    switch (column) {
      case "name":
        setName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        setActive("");
    }
  };

  const resetInputs = () => {
    setName("");
    setUserName("");
    setEmail("");
    setPhone("");
    setActive("");
  };

  const getInputValue = (column: FilterKeys) => {
    switch (column) {
      case "name":
        return name;
      case "userName":
        return userName;
      case "email":
        return email;
      case "phone":
        return phone;
      default:
        return "";
    }
  };

  const filteredUsers = useMemo(() => {
    let usersProcessed = [...users];
    if (name) {
      usersProcessed = usersProcessed.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (userName) {
      usersProcessed = usersProcessed.filter((user) =>
        user.username.toLowerCase().includes(userName.toLowerCase())
      );
    }

    if (email) {
      usersProcessed = usersProcessed.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    if (phone) {
      usersProcessed = usersProcessed.filter((user) =>
        user.phone.toLowerCase().includes(phone.toLowerCase())
      );
    }

    return usersProcessed;
  }, [name, userName, email, phone]);

  return (
    <TableContainer
      sx={{
        position: "relative",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <Table aria-label="simple table" sx={{ border: "1px solid #ccc" }}>
        <TableHead>
          <TableRow>
            {tableColumns.map((column, index) => (
              <TableCell
                key={index}
                sx={{ width: "25%" }}
                onClick={removeActiveColumn}
              >
                {active === column ? (
                  <TextField
                    variant="standard"
                    size="small"
                    inputRef={inputRef}
                    value={getInputValue(column)}
                    onChange={(e) =>
                      setActiveColumnValue(column, e.target.value)
                    }
                    placeholder={
                      column.charAt(0).toLocaleUpperCase() + column.slice(1)
                    }
                    sx={{
                      "& .MuiInputBase-root::after": {
                        borderColor: "#000",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        fontWeight: "bold",
                      },
                      width: "70%",
                    }}
                  />
                ) : (
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                    onClick={() => setActive(column)}
                  >
                    {getInputValue(column) ||
                      column.charAt(0).toLocaleUpperCase() + column.slice(1)}
                  </Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length ? (
            filteredUsers.map(({ id, name, username, email, phone }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell rowSpan={4}>
                There are no users matching the criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <IconButton
        onClick={resetInputs}
        disabled={![name, userName, email, phone].some((field) => field)}
        sx={{
          position: "absolute",
          top: "12px",
          right: "12px",
          color: "black",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </TableContainer>
  );
};
