import React from 'react'
import HeaderComponent from '../utilities/headerComponent'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
    </div>
  )
}

export default Layout
