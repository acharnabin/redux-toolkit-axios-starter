import React from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../hooks/useAppDispatch'

const Header = () => {
    const {cartItems}=useAppSelector(s=>s.product)
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <h2>Cart - {cartItems?.length}</h2>
    </div>
  )
}

export default Header