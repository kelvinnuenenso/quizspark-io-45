import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key } from 'lucide-react';

export default function Login() {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleDemoAccess = async () => {
    const success = await login('admin@test.com', '123456');
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">EQ</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Elevado Quizz</h1>
          <p className="text-lg text-foreground mb-8">Entre em sua conta</p>
        </div>

        <div className="space-y-4">
          {/* Demo Access Button */}
          <Button 
            onClick={handleDemoAccess}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium"
            disabled={isLoading}
          >
            <Key className="w-4 h-4 mr-2" />
            🔑 Acesso Demo Gratuito (Recomendado)
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OU USE EMAIL</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary-dark text-white" 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Cadastre-se
            </Link>
          </p>

          {/* Demo tip */}
          <div className="text-center text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            💡 <strong>Dica:</strong> Use o botão "Acesso Demo" para testar todas as funcionalidades instantaneamente!
          </div>
        </div>
      </div>
    </div>
  );
}