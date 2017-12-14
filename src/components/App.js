import React from 'react';
import NavBar from './NavBar';
import { Link, browserHistory } from 'react-router'


export default function App({children}) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}
