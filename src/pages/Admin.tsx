import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to Sanity Studio
    // In production, this would be a separate route or subdomain
    // For now, we'll show instructions
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
        <div className="space-y-4 text-foreground/80">
          <p>
            To access the Sanity Studio admin panel, you have two options:
          </p>
          
          <div className="bg-card p-6 rounded-lg space-y-4 text-left">
            <h2 className="text-2xl font-semibold text-foreground">Option 1: Standalone Studio (Recommended)</h2>
            <p>
              Run Sanity Studio separately for the best editing experience:
            </p>
            <code className="block bg-muted p-4 rounded text-sm">
              npm run studio
            </code>
            <p className="text-sm text-muted-foreground">
              This will start the Studio on a separate port (usually :3333)
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg space-y-4 text-left">
            <h2 className="text-2xl font-semibold text-foreground">Option 2: Embedded Studio</h2>
            <p>
              We can embed the Studio directly in this page. This requires additional setup.
            </p>
          </div>

          <div className="bg-accent/10 p-6 rounded-lg space-y-2 text-left">
            <h3 className="font-semibold text-foreground">Setup Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Create a Sanity project at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="text-accent underline">sanity.io</a></li>
              <li>Get your Project ID and Dataset name</li>
              <li>Create a <code className="bg-muted px-1 rounded">.env</code> file with:
                <pre className="bg-muted p-2 rounded mt-2 text-xs">
{`VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production`}
                </pre>
              </li>
              <li>Run <code className="bg-muted px-1 rounded">npm run studio</code> to start editing</li>
            </ol>
          </div>
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

