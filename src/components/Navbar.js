import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";


const Navbar = () => {
  return (
    <Stack
    bgcolor={'#66b178'}
    width='100%'
    height='65px'
    position='fixed'
      direction="row"
      padding='10px'
      alignItems='center'
      zIndex={9}
    >
      <Stack direction="row"  fontSize="24px" alignItems="flex-end">
        <Link
          style={{
            textDecoration: "none",
            color: "#3a1212",
            borderBottom: "3px solid #ff2625",
          }}
          to="/"
        >
          Home
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;