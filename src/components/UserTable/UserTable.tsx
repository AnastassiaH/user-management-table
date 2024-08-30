import { useAppSelector } from "../../app/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./UserTable.scss";
import { Paper } from "@mui/material";

const tableColumns = ["name", "username", "email", "phone"];

export const UserTable = () => {
  const { users } = useAppSelector((state) => state.users);
  return (
    <TableContainer>
      <Table
        aria-label="simple table"
        sx={{ maxWidth: 1200, margin: "0 auto", border: "1px solid #ccc" }}
      >
        <TableHead>
          <TableRow>
            {tableColumns.map((column, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, name, username, email, phone }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
