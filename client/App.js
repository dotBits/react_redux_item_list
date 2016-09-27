import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Headroom from 'react-headroom'
import Navbar from './components/navbar/Navbar'
import UserListRx from './components/users/ListRx'


const App = (props) => {
  const is_fluid = false,
        wrapperStyle = is_fluid ? {}:{marginBottom: '20px'},
        mainContainer_className = is_fluid ? 'container-fluid positionRelative' : 'container positionRelative';

  return(
    <div>
      <Headroom wrapperStyle={wrapperStyle}>
        <Navbar />
      </Headroom>
      <div className={mainContainer_className} >
        <UserListRx />
      </div>
    </div>
  )
}

export default App
