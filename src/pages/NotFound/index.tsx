import React from 'react'

const NotFoundPage: React.FC = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='text-center'>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
