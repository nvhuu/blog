import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='container mt-5'>
      <Outlet />
    </div>
  )
}

export default HomeLayout
