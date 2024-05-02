import logo from '../assets/logo.png'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'

const Logo = styled.img`
width: 220px;
cursor: pointer;
`
const NavContainer = styled.div`
padding: 30px 50px;

display: flex;
justify-content: space-between;
align-items: center;
`

const Nav = styled.div`
color: white;
text-transform: uppercase;
font-weight: 500;
font-size: 15px;

display: flex;
align-items: center;
gap: 50px;
`

export default function Navigation() {

  // console.log(NavLink);

  return(

    <NavContainer>
      <NavLink to={'/'}>
        <Logo src={logo} alt='company logo'/>
      </NavLink>
      <Nav>
        <NavLink 
          to={'/pricing'}
        >
          pricing
        </NavLink>
        <NavLink 
          to={'/product'}
        >
          product
        </NavLink>
        <NavLink to={'/login'}>
          <Button>
            login
          </Button>
        </NavLink>
      </Nav>
    </NavContainer>
  )
}