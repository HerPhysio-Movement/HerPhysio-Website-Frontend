// src/pages/AdminSignIn.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';

/* ─────────────────────────────────────────────
   Particle Network Background (Canvas)
   ───────────────────────────────────────────── */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 100;

    // resize handler
    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        // brand palette
        const colors = ['#FD90A7', '#C7365B', '#F08020', '#3070F0', '#6020F0'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // update & draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(253, 144, 167, ${0.15 - dist / CONNECTION_DIST * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'radial-gradient(circle at 50% 50%, #FFFAF9 0%, #FFEFE7 100%)' }}
    />
  );
};

/* ─────────────────────────────────────────────
   Admin Sign In Page
   ───────────────────────────────────────────── */
const AdminSignIn = () => {
  const navigate = useNavigate();
  const { adminLogin } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await adminLogin(email.trim(), password);
      toast.success('Welcome back, Admin!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Admin sign in failed:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFAF9]">
      {/* Particle network background */}
      <ParticleBackground />

      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Card header – gradient bar with shield */}
          <div className="relative bg-gradient-to-r from-[#FD90A7] to-[#C7365B] p-6 text-center text-white">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 animate-soft-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Admin Access</h1>
              <p className="text-white/80 text-sm mt-1">Secure management portal</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A19390] group-focus-within:text-[#FD90A7] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    placeholder="admin@herphysio.org"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/60 focus:border-transparent transition-all text-[#1A1A1A] placeholder-[#A19390]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A19390] group-focus-within:text-[#FD90A7] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/60 focus:border-transparent transition-all text-[#1A1A1A] placeholder-[#A19390]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#A19390] hover:text-[#FD90A7] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom link */}
            <p className="text-center text-sm text-[#A19390] mt-6">
              Don’t have an account?{' '}
              <Link to="/admin/signup" className="text-[#FD90A7] hover:underline font-medium">
                Create admin account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Soft pulse animation for shield */}
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-soft-pulse {
          animation: soft-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default AdminSignIn;