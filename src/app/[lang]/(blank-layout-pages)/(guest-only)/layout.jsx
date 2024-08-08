// HOC Imports
import GuestOnlyRoute from '@/hocs/GuestOnlyRoute'

import Navbar from './Navbar/page'

import Footer from './Footer'
import './Footer/Style.css'

// import 'bootstrap/dist/css/bootstrap.min.css'

const Layout = ({ children, params }) => {
  return (
    <GuestOnlyRoute lang={params.lang}>
      <div className='main-layout'>
        <Navbar />
        <main className='content'>{children}</main>

        <Footer />
      </div>
    </GuestOnlyRoute>
  )
}

export default Layout
