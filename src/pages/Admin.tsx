import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-foreground">Sanity Studio Access</h1>
        
        <div className="bg-card p-6 rounded-lg space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-foreground">Option 1: Local Studio (Recommended)</h2>
          <p className="text-foreground/80">
            Run this command in your terminal:
          </p>
          <code className="block bg-muted p-4 rounded text-sm">
            npm run studio
          </code>
          <p className="text-sm text-muted-foreground">
            Then open: <strong>http://localhost:3333</strong>
          </p>
          {isLocalhost && (
            <a 
              href="http://localhost:3333" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Open Local Studio →
            </a>
          )}
        </div>

        <div className="bg-card p-6 rounded-lg space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-foreground">Option 2: Deploy Studio</h2>
          <p className="text-foreground/80">
            To access Studio from anywhere, deploy it:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80">
            <li>Run: <code className="bg-muted px-1 rounded">npm run studio:build</code></li>
            <li>Then: <code className="bg-muted px-1 rounded">npx sanity deploy</code></li>
            <li>After deployment, access it at the provided URL</li>
          </ol>
        </div>

        <div className="bg-accent/10 p-6 rounded-lg space-y-2 text-left">
          <h3 className="font-semibold text-foreground">Quick Start:</h3>
          <p className="text-sm text-foreground/80">
            The easiest way is to use <strong>Option 1 (Local Studio)</strong>. 
            Just run <code className="bg-muted px-1 rounded">npm run studio</code> and open http://localhost:3333
          </p>
        </div>

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

