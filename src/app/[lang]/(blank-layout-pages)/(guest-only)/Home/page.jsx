'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import axios from 'axios'

import ProductCard from './ProductCard'

import Footer from '../Footer'

import '../Footer/Style.css'

import Navbar from '../Navbar/page'

const HomePage = () => {
  const { t } = useTranslation()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/products')

        setFeaturedProducts(response.data.slice(0, 6)) // Limiter à 6 produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits vedettes :', error)
        setError(t('error_loading_products'))
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [t])

  return (
    <Container className='mt-5'>
      <Row className='mb-4'>
        <Col className='text-center'>
          <h1>Bienvenue dans notre magasin</h1>
          <p>Nous proposons une large gamme de produits alimentaires de qualité.</p>
          <Button className=''>
            <Link href='/Products' className='text-white'>
              {t('Acheter maintenant')}
            </Link>
            {/* {t('Acheter maintenant')} */}
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className='mb-4'>
          <Col>
            <Alert variant='danger'>{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Ajoutez ici le code pour afficher les produits vedettes */}
    </Container>
  )
}

export default HomePage
