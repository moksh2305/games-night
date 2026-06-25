import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at top left, #121216, var(--bg-dark) 60%)',
      padding: '2rem'
    }}>
      
      <div className="glass-panel" style={{
        padding: '3rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
          <div className="logo-icon" style={{ fontSize: '2.5rem' }}>🎲</div>
          <h1 style={{ lineHeight: 1.1 }}>GAMES<br/>NIGHT</h1>
        </div>

        <div>
          <h2 style={{ marginBottom: '10px' }}>Welcome Back</h2>
          <p className="subtitle">Sign in to book tickets and manage your bookings.</p>
        </div>

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/" })
          }}
          style={{ width: '100%' }}
        >
          <button 
            type="submit" 
            className="btn btn-primary glow"
            style={{ 
              width: '100%', 
              justifyContent: 'center',
              display: 'flex',
              gap: '10px',
              padding: '14px',
              fontSize: '1rem',
              background: 'white',
              color: 'black'
            }}
          >
            <i className='bx bxl-google' style={{ fontSize: '1.2rem' }}></i>
            Continue with Google
          </button>
        </form>
        
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      
    </div>
  )
}
