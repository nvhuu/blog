import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeLayout from '~/layouts/HomeLayout'
import HomePage from '~/pages/HomePage'
import NotFound from '~/pages/NotFound'
import UpdateBlog from '~/pages/UpdateBlog'
import ViewBlog from '~/pages/ViewBlog'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/create' element={<UpdateBlog />} />
          <Route path='/blog/:id' element={<ViewBlog />} />
          <Route path='/blog/:id/edit' element={<UpdateBlog />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
