import { useEffect, useState } from 'react'
import './MyProfile.css'

function MyProfile({ userObj, isProfileOpen, toggleModal }) {
  const [profileSt, setProfileSt] = useState({
    name: userObj.name,
    email: userObj.email,
    entries: userObj.entries,
  })

  const updateProfile = (e) => {
    e.preventDefault()
    const { name, email, entries } = profileSt
    const id = userObj.id || '1'
    const data = {
      name,
      email,
      entries,
    }
    fetch(`http://localhost:3000/profile/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formInput: data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toggleModal()
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="profile-modal">
      {/* form to enable updates */}
      <form
        style={{
          display: 'grid',
          gridTemplateRows: '1fr',
          gap: '10px',
          border: '1px solid black',
          padding: '10px',
          width: '30%',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profileSt.name}
          onChange={(e) => setProfileSt({ ...profileSt, name: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={profileSt.email}
          onChange={(e) =>
            setProfileSt({ ...profileSt, email: e.target.value })
          }
        />
        <button className="update-button" onClick={updateProfile} type="submit">
          Update
        </button>
      </form>

      {/* show profile information below */}
      <div
        style={{
          border: '1px groove black',
          padding: '10px',
          width: '30%',
          textAlign: 'center',
        }}
      >
        <h1>Profile</h1>
        <p>Name: {userObj.name}</p>
        <p>Email: {userObj.email}</p>
        <p>Entries: {userObj.entries}</p>
        <button className="close-button" onClick={toggleModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default MyProfile
