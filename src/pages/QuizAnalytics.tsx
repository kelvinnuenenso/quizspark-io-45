import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  Download, 
  Filter,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

const mockAnalytics = {
  overview: {
    views: 15847,
    started: 8932,
    completed: 6241,
    leads: 2847,
    conversionRate: 45.6,
    avgTime: '4:32'
  },
  dropOff: [
    { step: 'Introdução', views: 15847, completed: 14523, rate: 91.6 },
    { step: 'Pergunta 1', views: 14523, completed: 12894, rate: 88.8 },
    { step: 'Pergunta 2', views: 12894, completed: 10234, rate: 79.4 },
    { step: 'Pergunta 3', views: 10234, completed: 8742, rate: 85.4 },
    { step: 'Resultados', views: 8742, completed: 6241, rate: 71.4 }
  ],
  timePerQuestion: [
    { question: 'Pergunta 1', avgTime: '1:24', dropRate: 12 },
    { question: 'Pergunta 2', avgTime: '2:18', dropRate: 21 },
    { question: 'Pergunta 3', avgTime: '1:52', dropRate: 15 },
  ],
  responses: {
    'Pergunta 1': [
      { option: 'Gerar mais leads', count: 2847, percentage: 45.6 },
      { option: 'Aumentar vendas', count: 1894, percentage: 30.4 },
      { option: 'Melhorar branding', count: 947, percentage: 15.2 },
      { option: 'Engajar audiência', count: 553, percentage: 8.8 }
    ]
  }
};

export default function QuizAnalytics() {
  const [dateRange, setDateRange] = useState('30d');

  const StatCard = ({ icon: Icon, title, value, change, changeType }: {
    icon: any;
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative';
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span className={changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
              {changeType === 'positive' ? '+' : '-'}{change}
            </span>
            {' '}desde o período anterior
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📊 Analytics</h1>
          <p className="text-muted-foreground">
            Métricas detalhadas do desempenho dos seus quizzes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Período: 30 dias
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatCard
          icon={Eye}
          title="Visualizações"
          value={mockAnalytics.overview.views.toLocaleString()}
          change="12%"
          changeType="positive"
        />
        <StatCard
          icon={Users}
          title="Iniciaram"
          value={mockAnalytics.overview.started.toLocaleString()}
          change="8%"
          changeType="positive"
        />
        <StatCard
          icon={Target}
          title="Concluíram"
          value={mockAnalytics.overview.completed.toLocaleString()}
          change="5%"
          changeType="positive"
        />
        <StatCard
          icon={Zap}
          title="Leads"
          value={mockAnalytics.overview.leads.toLocaleString()}
          change="15%"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          title="Taxa Conversão"
          value={`${mockAnalytics.overview.conversionRate}%`}
          change="2.1%"
          changeType="positive"
        />
        <StatCard
          icon={Clock}
          title="Tempo Médio"
          value={mockAnalytics.overview.avgTime}
          change="32s"
          changeType="negative"
        />
      </div>

      <Tabs defaultValue="funnel" className="w-full">
        <TabsList>
          <TabsTrigger value="funnel">Funil de Drop-off</TabsTrigger>
          <TabsTrigger value="timing">Tempo por Pergunta</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap de Respostas</TabsTrigger>
          <TabsTrigger value="sources">Fontes de Tráfego</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Funil de Drop-off</CardTitle>
              <CardDescription>
                Veja onde os usuários abandonam o quiz e identifique gargalos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.dropOff.map((step, index) => (
                  <div key={step.step} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{step.step}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-muted-foreground">
                          {step.completed.toLocaleString()} de {step.views.toLocaleString()}
                        </div>
                        <Badge variant={step.rate > 85 ? 'default' : step.rate > 70 ? 'secondary' : 'destructive'}>
                          {step.rate}%
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            step.rate > 85 ? 'bg-green-500' : 
                            step.rate > 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${step.rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⏱️ Tempo Médio por Pergunta</CardTitle>
              <CardDescription>
                Identifique perguntas que podem estar causando confusão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.timePerQuestion.map((question, index) => (
                  <div key={question.question} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{question.question}</h4>
                      <p className="text-sm text-muted-foreground">
                        Tempo médio: {question.avgTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={question.dropRate > 20 ? 'destructive' : question.dropRate > 15 ? 'secondary' : 'default'}>
                        {question.dropRate}% drop
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔥 Heatmap de Respostas</CardTitle>
              <CardDescription>
                Veja quais opções são mais populares em cada pergunta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Qual é o seu objetivo principal?</h4>
                  <div className="space-y-2">
                    {mockAnalytics.responses['Pergunta 1'].map((option) => (
                      <div key={option.option} className="flex items-center gap-3">
                        <div className="w-40 text-sm">{option.option}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              {option.count} respostas
                            </span>
                            <span className="text-xs font-medium">
                              {option.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all"
                              style={{ width: `${option.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>📈 Fontes de Tráfego</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { source: 'Busca Orgânica', visits: 8943, percentage: 56.4 },
                    { source: 'Redes Sociais', visits: 4521, percentage: 28.5 },
                    { source: 'Direto', visits: 1892, percentage: 11.9 },
                    { source: 'Email Marketing', visits: 491, percentage: 3.1 }
                  ].map((item) => (
                    <div key={item.source} className="flex items-center justify-between">
                      <span className="text-sm">{item.source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {item.visits.toLocaleString()}
                        </span>
                        <Badge variant="outline">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🌍 Localização</CardTitle>
                <CardDescription>Top países/regiões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { country: 'Brasil', visits: 12943, percentage: 81.6 },
                    { country: 'Portugal', visits: 1521, percentage: 9.6 },
                    { country: 'Estados Unidos', visits: 892, percentage: 5.6 },
                    { country: 'Outros', visits: 491, percentage: 3.1 }
                  ].map((item) => (
                    <div key={item.country} className="flex items-center justify-between">
                      <span className="text-sm">{item.country}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {item.visits.toLocaleString()}
                        </span>
                        <Badge variant="outline">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}