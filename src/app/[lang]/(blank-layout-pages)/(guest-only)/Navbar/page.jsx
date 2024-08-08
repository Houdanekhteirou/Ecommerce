'use client'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { useParams, useRouter } from 'next/navigation'

import { changeLanguage } from 'i18next'

// import {  useLocation } from 'react-router-dom' // Import useLocation

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faSignOutAlt,
  faShoppingCart,
  faUser,
  faHeart,
  faGlobe,
  faUserLock
} from '@fortawesome/free-solid-svg-icons'

// import './AdFC.css'

import '../style.css' // Ensure your CSS file is correctly imported

import { useTranslation } from 'react-i18next'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'

import { isLoggedIn, savelang, getlang, getUserId } from '../Account/userStorageService'

function Navbar() {
  const { t, i18n } = useTranslation()

  // const { t2 } = dictionaries.navigation
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [budget, setBudget] = useState(0) // Adding a state for the budget
  const [isLoggedInState, setIsLoggedInState] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  // console.log('t2', t2)

  const userId = getUserId()

  const router = useRouter()

  // const navigate = useNavigate()
  // const location = useLocation() // Use useLocation hook
  const params = useParams()

  useEffect(() => {
    const lang = getlang()

    if (lang) {
      // i18n.changeLanguage(lang)
    }

    setIsLoggedInState(isLoggedIn())
    fetchCartData()
    fetchWishlistData()
    fetchBudgetData()

    const handleCartUpdated = event => {
      setCartCount(event.detail.cartCount)
    }

    const handleWishlistUpdated = event => {
      setWishlistCount(event.detail.wishlistCount)
    }

    const handleBudgetUpdated = event => {
      setBudget(event.detail.budget)
    }

    window.addEventListener('cartUpdated', handleCartUpdated)
    window.addEventListener('wishlistUpdated', handleWishlistUpdated)
    window.addEventListener('budgetUpdated', handleBudgetUpdated)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated)
      window.removeEventListener('wishlistUpdated', handleWishlistUpdated)
      window.removeEventListener('budgetUpdated', handleBudgetUpdated)
    }
  }, [])

  const fetchCartData = async () => {
    try {
      const lang = getlang()

      const response = await axios.get(`http://localhost:8080/api/customer/cart/${userId}`, { params: { lang } })

      if (response.data && response.data.cartItems) {
        setCartCount(response.data.cartItems.length)
      }
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  const fetchWishlistData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customer/wishlist/${userId}`)

      if (response.data) {
        setWishlistCount(response.data.length)
      }
    } catch (error) {
      console.error('Error fetching wishlist data:', error)
    }
  }

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customer/budget/${userId}`)

      if (response.data) {
        setBudget(response.data.budget)
      }
    } catch (error) {
      console.error('Error fetching budget data:', error)
    }
  }

  const USER = 'ecom-user'

  const getUser = () => {
    const user = localStorage.getItem(USER)

    return user ? JSON.parse(user) : null
  }

  const handleCartClick = () => {
    const user = getUser()

    if (user) {
      router.push('/cart')
    } else {
      router.push('/SigIn')
    }
  }

  const handleWishlistClick = () => {
    const user = getUser()

    if (user) {
      router.push('/wishlist')
    } else {
      router.push('/SigIn')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    savelang(lng)
    setIsLanguageMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <>
      <nav className='navbar navbar-expand-lg' id='navbar'>
        <div className='container-fluid'>
          <Link className='navbar-brand' href='/' id='logo'>
            <span id='span1'>{t('Sa')}</span>
            {t('ïrti')} <span></span>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={` navbar-collapse ${isMenuOpen ? 'show' : ''}`} id='navbarSupportedContent'>
            <ul className='navbar-nav mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}
                  aria-current='page'
                  href='/'
                  onClick={closeMenu}
                >
                  {t('home')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${router.pathname === '/Products' ? 'active' : ''}`}
                  href='/Products'
                  onClick={closeMenu}
                >
                  {t('produ')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${router.pathname === '/AboutUs' ? 'active' : ''}`}
                  href='/about'
                  onClick={closeMenu}
                >
                  {t('about')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${router.pathname === '/ContactUs' ? 'active' : ''}`}
                  href='/ContactUs'
                  onClick={closeMenu}
                >
                  {t('contact')}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${router.pathname === '/test' ? 'active' : ''}`}
                  href='/test'
                  onClick={closeMenu}
                >
                  {t('Statut')}
                </Link>
              </li>
            </ul>

            <div className='container-fluid p-2'>
              <div className='d-flex justify-content-end align-items-center'>
                <div className='dropdown'>
                  <div className='nav-link text-white ' onClick={toggleLanguageMenu}>
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                  {isLanguageMenuOpen && (
                    <ul className='dropdown-menu show' style={{ display: 'block' }}>
                      <li>
                        <button className='dropdown-item' onClick={() => changeLanguage('fr')}>
                          Français
                        </button>
                      </li>
                      <li>
                        <button className='dropdown-item' onClick={() => changeLanguage('ar')}>
                          العربية
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

                <Link href='/cart' className='nav-link text-white position-relative' onClick={closeMenu}>
                  <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
                  {cartCount > 0 && (
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                      {cartCount}
                      <span className='visually-hidden'>items in cart</span>
                    </span>
                  )}
                </Link>

                <Link href='/wishlist' className='nav-link text-white position-relative' onClick={closeMenu}>
                  <FontAwesomeIcon icon={faHeart} className='me-2' />
                  {wishlistCount > 0 && (
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                      {wishlistCount}
                      <span className='visually-hidden'>items in wishlist</span>
                    </span>
                  )}
                </Link>

                {isLoggedInState ? (
                  <Link href='/logout' className='nav-link text-white d-flex align-items-center' onClick={closeMenu}>
                    <FontAwesomeIcon icon={faSignOutAlt} className='me-1' />
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                ) : (
                  <Link href='/SigIn' className='nav-link text-white' onClick={closeMenu}>
                    <FontAwesomeIcon icon={faUserLock} className='me-2' />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <br />
    </>
  )
}

export default Navbar
