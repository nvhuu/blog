import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='container my-5'>
      <Outlet />
    </div>
  )
}

export default HomeLayout
