import React from 'react'
import { ROUTE_NAMES } from '../../constants'
import ProfileIcon from '../Profile/ProfileIcon'

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    )
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange(ROUTE_NAMES.SIGNIN)}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange(ROUTE_NAMES.REGISTER)}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    )
  }
}

export default React.memo(Navigation)
