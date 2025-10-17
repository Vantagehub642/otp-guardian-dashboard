import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const isAdmin = user.role === 'super_admin';

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'var(--gradient-bg)',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="backdrop-blur-sm bg-card/95 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isAdmin ? 'bg-gradient-to-br from-primary to-primary-glow' : 'bg-secondary'
                }`}>
                  {isAdmin ? (
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Building2 className="w-6 h-6 text-secondary-foreground" />
                  )}
                </div>
                <Badge variant={isAdmin ? 'default' : 'secondary'} className="font-semibold">
                  {isAdmin ? 'Super Admin' : 'Company'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">Account Type</CardTitle>
              <CardDescription>
                {isAdmin 
                  ? 'Full system access with administrative privileges'
                  : 'Company account with standard access'}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/95 border-border/50">
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Your registered email address
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/95 border-border/50">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-medium">Active</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your session is active
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {['View Reports', 'Manage Users', 'Settings', 'Analytics'].map((action) => (
                <Button 
                  key={action}
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:border-primary hover:bg-accent transition-colors"
                >
                  <span className="font-semibold">{action}</span>
                  <span className="text-xs text-muted-foreground">Click to access</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
