import React from 'react';
import NavBar from './NavBar';
import { Link, browserHistory } from 'react-router'


export default function App({children}) {
  return (
    <div>
      <header>
        <NavBar />
        {/*<h1>Peer bids</h1>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/test">test</Link>*/}
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}
