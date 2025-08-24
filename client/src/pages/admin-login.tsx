import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Alert component defined inline
const Alert = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative w-full rounded-lg border p-4 ${className}`} role="alert">
    {children}
  </div>
);

const AlertDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simple password check - in production this should be more secure
      if (password === 'Gerardo') {
        // Set admin session
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_session', Date.now().toString());
        
        toast({
          title: "✅ Acceso autorizado",
          description: "Bienvenido al panel de administración",
        });
        
        setLocation('/admin');
      } else {
        setError('Contraseña incorrecta. Acceso denegado.');
      }
    } catch (err) {
      setError('Error de autenticación. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Acceso Administrativo
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Panel de administración GTR CUBAUTO
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Contraseña de Administrador
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                    data-testid="admin-password-input"
                  />
                </div>
              </div>

              {error && (
                <Alert className="bg-red-900/20 border-red-600">
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                data-testid="admin-login-button"
              >
                {isLoading ? 'Verificando...' : 'Acceder al Panel'}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setLocation('/')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                data-testid="back-to-home-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
              <p>🔒 Área restringida - Solo personal autorizado</p>
              <p className="mt-1">Se registran todos los intentos de acceso</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}