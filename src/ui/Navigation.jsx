import logo from '../assets/logo.png'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/pro-duotone-svg-icons'
import { useState } from 'react'


const Logo = styled.img`
  width: 220px;
  cursor: pointer;

  @media (max-width: 425px) {
    width: 180px;
  }
`
const NavContainer = styled.div`
  padding: 30px 50px;
  position: relative;
  /* background-color: red; */
  /* z-index: 100; */

  display: flex;
  align-items: center;

  @media (max-width: 2560px) {
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;

  }

  @media (max-width: 380px) {
    padding: 30px 15px;
  }
`

const Nav = styled.div`
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 15px;
  position: absolute;
  right: 80px;

  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;

    &.active {
      color:  var(--green-color);
    }

    @media (max-width: 768px) {
      color: black;
    }
`
// Mobile side
const MobileMenu = styled.div`
  @media (max-width: 2560px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    font-size: 15px;
    top: 100px;
    right: 25px;
    background-color: #ffffff;
    color: black;
    padding: 30px;
    text-transform: uppercase;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 25px;
  left: 25px;
  right: 50px;
  width: calc(100% - 50px);
  height: calc(100vh - 50px);
  background-color: #799db249;
  backdrop-filter: blur(4px);
  z-index: 2;

  @media (max-width: 2560px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenuIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  position: fixed;
  top: 60px;
  right: 50px;
  z-index: 3;

  @media (max-width: 2560px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 425px) {
    top: 64px;
    font-size: 30px;
  }
`

const MobileXIcon = styled(MobileMenuIcon)``


export default function Navigation() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  return(

    <NavContainer>
      <NavLink to={'/'}>
        <Logo src={logo} alt='company logo'/>
      </NavLink>
      <Nav>
        <CustomNavLink 
          to={'/pricing'}
        >
          pricing
        </CustomNavLink>
        <CustomNavLink 
          to={'/product'}
        >
          product
        </CustomNavLink>
        <NavLink to={'/login'}>
          <Button>
            login
          </Button>
        </NavLink>
      </Nav>

      {/* when the app is in mobile */}
        {isMenuOpen &&
        <div onClick={() => setIsMenuOpen((value) => !value)}>
          <MobileXIcon icon={faX} />
        </div>
        }
        {!isMenuOpen && 
          <div onClick={() => setIsMenuOpen((value) => !value)}>
            <MobileMenuIcon icon={faBars} />
          </div>
        }
        {isMenuOpen &&
          <Overlay >
            <MobileMenu>
              <CustomNavLink 
                to={'/pricing'}
                onClick={() => setIsMenuOpen((value) => !value)}
              >
                pricing
              </CustomNavLink>
              <CustomNavLink 
                to={'/product'}
                onClick={() => setIsMenuOpen((value) => !value)}
              >
                product
              </CustomNavLink>
              <NavLink 
                to={'/login'}
                onClick={() => setIsMenuOpen((value) => !value)}
              >
                <Button>
                  login
                </Button>
              </NavLink>
            </MobileMenu>
          </Overlay>
        }
    </NavContainer>
  )
}