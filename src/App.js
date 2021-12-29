import React, { Component } from 'react'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import MyModal from './components/MyModal/MyModal'
import './App.css'
import { ROUTE_NAMES } from './constants'
import MyProfile from './components/Profile/MyProfile'

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: ROUTE_NAMES.HOME,
  isSignedIn: true,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    })
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs && data.outputs[0].data.regions) {
      const clarifaiFace =
        data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputimage')
      const width = Number(image.width)
      const height = Number(image.height)
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      }
    } else {
      return null
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        const faceLocation = this.calculateFaceLocation(responseJson)

        if (faceLocation) {
          this.displayFaceBox(faceLocation)
        }
      })
      .catch((err) => console.log(err))
  }

  onRouteChange = (newRoute) => {
    if (newRoute === ROUTE_NAMES.SIGNOUT) {
      this.setState(initialState)
    } else if (newRoute === ROUTE_NAMES.HOME) {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: newRoute })
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }))
  }

  render() {
    const { isSignedIn, imageUrl, route, box, isProfileOpen } = this.state
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />

        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />

        {isProfileOpen ? (
          <MyModal>
            <div>My modal content</div>
            <MyProfile
              userObj={this.state.user}
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
            />
          </MyModal>
        ) : null}

        {route === ROUTE_NAMES.HOME ? (
          <div>
            <Logo />

            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />

            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === ROUTE_NAMES.SIGNIN ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    )
  }
}

export default App
