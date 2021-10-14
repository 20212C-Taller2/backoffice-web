import React from "react"
import { Avatar, Button } from "@material-ui/core"
import { Col } from "../primitives/Flexbox"
import { setTo, useStatefull } from "../utils/state"
import { AdminUser } from "../user/AdminUser"
import { useAdminUser } from "../hooks/context"
import { ProfileDrawer } from "./ProfileDrawer"
import { IO } from "../utils/functional"
import { Text } from "../primitives/Text"

// Main colors
// Logo colors
// #c3e1f0
// #82c3e6
// #199bd2

export const DrawerButton = () => {
  
  const showMainDrawer = useStatefull<boolean>(() => false)
  

  return(
    <>
      <Col
        margin={{right: 50}}
      >
        <AvatarInitials
          onClick={setTo(showMainDrawer, true)}
          style={{width: 60, height: 60, backgroundColor:"#c3e1f0"}}
        />
      </Col>
      <ProfileDrawer
        open={showMainDrawer}
      />
    </>
  )
}

export const AvatarInitials = (
  props: {
    onClick?: IO<void>
    style?: React.CSSProperties
  }  
) => {

  const adminUser = useAdminUser()  
  return(
    <Button  
      onClick={props.onClick}
    >
      <Avatar
        style={props.style}
      >
        <Text
          text={initials(adminUser)}
          fontSize={25}
          color={"#282C34"}
        />
      </Avatar>
    </Button>
  )
}

const initials = (user: AdminUser): string => 
  `${user.credentials.user.firstName[0]}${user.credentials.user.lastName[0]}`.toUpperCase()
  