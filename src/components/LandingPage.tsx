import { useState } from 'react';
import { Video, Calendar, FileText, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LandingPageProps {
  onRegister: (name: string, email: string) => void;
}

export function LandingPage({ onRegister }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  // Simulación de usuarios registrados (en producción esto estaría en una base de datos)
  const [users] = useState([
    { name: 'Usuario Demo', email: 'demo@medconnect.com', password: 'demo123' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    
    if (!email.trim()) {
      newErrors.email = 'Por favor, escribe tu correo electrónico';
    } else if (!email.includes('@')) {
      newErrors.email = 'El correo debe incluir el símbolo @';
    }

    if (!password.trim()) {
      newErrors.password = 'Por favor, escribe tu contraseña';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (isLogin) {
      // Validación para login
      if (newErrors.email || newErrors.password) {
        setErrors(newErrors);
        return;
      }

      // Verificar credenciales
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onRegister(user.name, user.email);
      } else {
        newErrors.email = 'Correo o contraseña incorrectos';
        setErrors(newErrors);
      }
    } else {
      // Validación para registro
      if (!name.trim()) {
        newErrors.name = 'Por favor, escribe tu nombre completo';
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Por favor, confirma tu contraseña';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }

      if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirmPassword) {
        setErrors(newErrors);
        return;
      }

      // Verificar si el usuario ya existe
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        newErrors.email = 'Este correo ya está registrado. Intenta iniciar sesión';
        setErrors(newErrors);
        return;
      }

      // Registrar nuevo usuario
      onRegister(name, email);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-900">MedConnect</span>
            </div>
            {!showAuth && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsLogin(true);
                  }}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsLogin(false);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {!showAuth ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-blue-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-blue-900 mb-6">
                  Consultas médicas desde tu casa
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                  Habla con doctores profesionales por videollamada. Simple, rápido y seguro.
                </p>
                <button
                  onClick={() => {
                    setShowAuth(true);
                    setIsLogin(false);
                  }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>Empezar ahora</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-gray-900 mb-12">
                ¿Cómo funciona?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-3">
                    1. Agenda tu cita
                  </h3>
                  <p className="text-gray-600">
                    Elige el día y la hora que mejor te convenga. Es muy fácil.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-3">
                    2. Habla con el doctor
                  </h3>
                  <p className="text-gray-600">
                    Conéctate por videollamada desde tu celular o computadora.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-3">
                    3. Recibe tu diagnóstico
                  </h3>
                  <p className="text-gray-600">
                    Guarda toda la información de tu consulta en un solo lugar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      Tu información está protegida
                    </h3>
                    <p className="text-gray-600">
                      Todos nuestros doctores están certificados y tu información médica está completamente segura y privada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-20">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 mb-2 text-center">
                {isLogin ? 'Iniciar sesión' : 'Crea tu cuenta'}
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                {isLogin 
                  ? 'Ingresa tus datos para acceder' 
                  : 'Solo necesitamos algunos datos para empezar'}
              </p>

              {isLogin && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm mb-2">
                    Cuenta de demostración:
                  </p>
                  <p className="text-blue-700 text-sm">
                    📧 demo@medconnect.com
                  </p>
                  <p className="text-blue-700 text-sm">
                    🔑 demo123
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ejemplo: María García"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-red-600 text-sm">
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ejemplo@correo.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-red-600 text-sm">
                      {errors.email}
                    </p>
                  )}
                  {!isLogin && (
                    <p className="mt-2 text-gray-500 text-sm">
                      Te enviaremos recordatorios de tus citas a este correo
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: '' });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={isLogin ? 'Tu contraseña' : 'Mínimo 6 caracteres'}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-2 text-red-600 text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setErrors({ ...errors, confirmPassword: '' });
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Escribe tu contraseña nuevamente"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        title={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="mt-2 text-red-600 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                  <button
                    onClick={switchMode}
                    className="ml-2 text-blue-600 hover:text-blue-700"
                  >
                    {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}