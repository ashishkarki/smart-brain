import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import React, { useState } from 'react'
import { ROUTE_NAMES } from '../../constants'

function ProfileIcon({ onRouteChange }) {
  const [profileState, setProfileState] = useState({
    dropdownOpen: false,
  })

  const toggle = () =>
    // setProfileState((prevState) => ({
    //   ...prevState,
    //   dropdownOpen: !prevState.dropdownOpen,
    // }))
    setProfileState({
      ...profileState,
      dropdownOpen: !profileState.dropdownOpen,
    })

  return (
    <div className="pa4 tc">
      <Dropdown isOpen={profileState.dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange(ROUTE_NAMES.SIGNOUT)}>
            Signout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="pa4 tc">
        <img
          src="https://tachyons.io/img/logo.jpg"
          className="br-100 ba h3 w3 dib"
          alt="avatar"
        />
      </div>
    </div>
  )
}

export default React.memo(ProfileIcon)
