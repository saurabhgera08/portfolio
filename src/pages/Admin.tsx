import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to Sanity's hosted Studio
    // This is the easiest way to access Studio in production
    window.location.href = 'https://dju5bkf8.sanity.studio'
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
        <h1 className="text-4xl font-bold text-foreground">Redirecting to Sanity Studio...</h1>
        <p className="text-foreground/80">
          If you're not redirected automatically,{' '}
          <a 
            href="https://dju5bkf8.sanity.studio" 
            className="text-accent underline hover:no-underline"
          >
            click here
          </a>
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Portfolio
        </button>
      </div>
    </div>
  )
}

export default Admin

