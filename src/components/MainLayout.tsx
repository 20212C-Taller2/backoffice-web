import { Avatar } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { History } from 'history';
import React, { useState } from "react";
import iconUbademy from "../../res/images/ubademy.svg";
import { Col, Row } from "../primitives/Flexbox";
import { Picture } from "../primitives/Picture";
import { Text } from "../primitives/Text";


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export const MainLayout = (
  props: {
    children?: React.ReactNode,
    history: History
  }
): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.history.push("/");
  }

  return (
    <Col
      fill
      style={{ backgroundColor: "lightblue" }}
    >
      <Row height={"20%"} style={{ backgroundColor: "lightblue" }} alignChildren="center">
        <Picture
          source={iconUbademy}
        />
        <Text
          color={"white"}
          text={"Ubademy"}
          fontSize={40}
        />
        <Avatar></Avatar>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Hola
        </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </StyledMenuItem>
        </StyledMenu>
      </Row>
      <Col fill style={{ backgroundColor: "white" }}>
        {props.children}
      </Col>
    </Col>
  )
}
