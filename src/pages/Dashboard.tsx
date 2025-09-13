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
            <div className="space-y-6">
              {/* Analytics Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Mapa de Calor</h2>
                  <p className="text-muted-foreground">Visualize onde os usuários mais interagem no seu quiz</p>
                </div>
                <div className="flex items-center gap-2">
                  <select className="border border-border rounded-md px-3 py-2 text-sm bg-background">
                    <option>Cliques</option>
                    <option>Hovers</option>
                    <option>Tempo</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* Sub tabs */}
              <Tabs defaultValue="mapa" className="w-full">
                <TabsList className="grid w-fit grid-cols-3 mb-6">
                  <TabsTrigger value="mapa">Mapa de Calor</TabsTrigger>
                  <TabsTrigger value="testes">Testes A/B</TabsTrigger>
                  <TabsTrigger value="coorte">Análise de Coorte</TabsTrigger>
                </TabsList>

                <TabsContent value="mapa">
                  {/* Analytics Stats */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total de Cliques</p>
                          <p className="text-3xl font-bold">733</p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500">
                          <div className="h-6 w-6 text-white flex items-center justify-center">
                            👆
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total de Hovers</p>
                          <p className="text-3xl font-bold">1.269</p>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500">
                          <div className="h-6 w-6 text-white flex items-center justify-center">
                            👁️
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tempo Total</p>
                          <p className="text-3xl font-bold">21s</p>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500">
                          <div className="h-6 w-6 text-white flex items-center justify-center">
                            ⏱️
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Impacto na Conversão</p>
                          <p className="text-3xl font-bold">83%</p>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500">
                          <div className="h-6 w-6 text-white flex items-center justify-center">
                            🎯
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Visualization Tabs */}
                  <Tabs defaultValue="visualizacao" className="w-full">
                    <TabsList className="grid w-fit grid-cols-3 mb-6">
                      <TabsTrigger value="visualizacao">Visualização</TabsTrigger>
                      <TabsTrigger value="dados">Dados Detalhados</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                    </TabsList>

                    <TabsContent value="visualizacao">
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold">Mapa de Calor - Cliques</h3>
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">Intensidade</div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <span className="text-xs text-muted-foreground">Muito Alta</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                              <span className="text-xs text-muted-foreground">Alta</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-xs text-muted-foreground">Média</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-muted-foreground">Baixa</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Heatmap Visualization */}
                        <div className="relative h-96 bg-gray-50 rounded-lg border border-border overflow-hidden">
                          <div className="absolute inset-0 p-8">
                            {/* Simulated heatmap dots */}
                            <div className="relative w-full h-full">
                              {/* Green dot - top center */}
                              <div className="absolute w-6 h-6 bg-green-500 rounded-full opacity-70" 
                                   style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}></div>
                              
                              {/* Large red dot - center */}
                              <div className="absolute w-16 h-16 bg-red-500 rounded-full opacity-70" 
                                   style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}></div>
                              
                              {/* Orange dot - left */}
                              <div className="absolute w-10 h-10 bg-orange-500 rounded-full opacity-70" 
                                   style={{ top: '50%', left: '25%', transform: 'translate(-50%, -50%)' }}></div>
                              
                              {/* Blue dot - right */}
                              <div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-70" 
                                   style={{ top: '50%', right: '15%', transform: 'translateY(-50%)' }}></div>
                              
                              {/* Large red dot - bottom */}
                              <div className="absolute w-14 h-14 bg-red-500 rounded-full opacity-70" 
                                   style={{ bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="dados">
                      <Card className="p-6">
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">Dados detalhados em desenvolvimento...</p>
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="insights">
                      <Card className="p-6">
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">Insights em desenvolvimento...</p>
                        </div>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="testes">
                  <Card className="p-6">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Testes A/B em desenvolvimento...</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="coorte">
                  <Card className="p-6">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Análise de Coorte em desenvolvimento...</p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
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