import Footer from '@/components/Footer'
import { Outlet } from 'react-router-dom'

function Index() {
  return (
    <div>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Index