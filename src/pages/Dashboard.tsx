import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Zap, 
  TrendingUp, 
  Plus, 
  Download,
  Edit,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

// Mock data
const dashboardStats = {
  totalQuizzes: 1,
  totalResponses: 0,
  totalLeads: 0,
  conversionRate: 0
};

const mockQuizzes = [
  {
    id: '1',
    name: 'Novo Quiz',
    status: 'draft' as const,
    description: 'Descreva seu quiz aqui...',
    questions: 1,
    responses: 0,
    leads: 0,
    conversionRate: 0
  }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const StatCard = ({ icon: Icon, title, value, iconColor }: {
    icon: any;
    title: string;
    value: string | number;
    iconColor: string;
  }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Gerencie seus quizzes e monitore performance</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Olá, {user?.name || 'demo'}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            icon={BarChart3}
            title="Total de Quizzes"
            value={dashboardStats.totalQuizzes}
            iconColor="bg-blue-500"
          />
          <StatCard
            icon={Users}
            title="Respostas"
            value={dashboardStats.totalResponses}
            iconColor="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Leads Capturados"
            value={dashboardStats.totalLeads}
            iconColor="bg-purple-500"
          />
          <StatCard
            icon={Zap}
            title="Taxa Conversão"
            value={`${dashboardStats.conversionRate}%`}
            iconColor="bg-orange-500"
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            <TabsTrigger value="gamificacao">Gamificação</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="geral">
            <div className="space-y-6">
              {/* Quizzes Section */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Seus Quizzes</h2>
                <div className="flex gap-2">
                  <Button variant="outline">Ver Templates</Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Importar Quiz
                  </Button>
                  <Button onClick={() => navigate('/quiz/builder')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Quiz
                  </Button>
                </div>
              </div>

              {/* Quiz Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Novo Quiz</h3>
                        <Badge variant="secondary">Rascunho</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Descreva seu quiz aqui...</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="text-blue-600">1 pergunta</span>
                        <span>0 respostas</span>
                        <span>0 leads</span>
                        <span>0% conversão</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/quiz/builder')}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Analytics em breve...</p>
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Leads em breve...</p>
            </div>
          </TabsContent>

          <TabsContent value="integracoes">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Integrações em breve...</p>
            </div>
          </TabsContent>

          <TabsContent value="gamificacao">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gamificação em breve...</p>
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Lista completa de quizzes em breve...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}