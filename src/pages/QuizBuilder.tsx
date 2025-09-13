import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Tab Components
import QuestionsTab from '@/components/quiz-builder/QuestionsTab';
import EditorTab from '@/components/quiz-builder/EditorTab';
import ThemeTab from '@/components/quiz-builder/ThemeTab';
import ResultsTab from '@/components/quiz-builder/ResultsTab';
import PixelsTab from '@/components/quiz-builder/PixelsTab';
import AnalyticsTab from '@/components/quiz-builder/AnalyticsTab';
import EngagementTab from '@/components/quiz-builder/EngagementTab';
import WebhooksTab from '@/components/quiz-builder/WebhooksTab';
import ConfigTab from '@/components/quiz-builder/ConfigTab';
import { 
  ArrowLeft,
  Eye,
  Link,
  Save,
  Share,
  HelpCircle, 
  Palette, 
  Edit, 
  Target, 
  Code, 
  BarChart3, 
  Heart, 
  Webhook, 
  Settings,
  Plus,
  Undo2,
  RotateCcw,
  RotateCw,
  Smartphone,
  Tablet,
  Monitor,
  Trash2,
  GripVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quizSteps = [
  { id: '1', name: 'Introdução', type: 'intro', selected: true },
  { id: '2', name: 'Pergunta 1', type: 'question', number: 1 },
  { id: '3', name: 'Resultado', type: 'result', number: 4 }
];

const componentLibrary = [
  { category: 'Social', items: ['Visualização', 'Efeitos'] },
  { category: 'Estrutura', items: [] },
  { category: 'Texto', items: ['Parágrafo ou texto explicativo'] },
  { category: 'Título', items: ['Cabeçalho ou título da seção'] },
  { category: 'Imagem', items: ['Foto, ilustração ou gráfico'] }
];

export default function QuizBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perguntas');
  const [selectedStep, setSelectedStep] = useState('1');
  const [previewMode, setPreviewMode] = useState('desktop');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Novo Quiz</h1>
              <p className="text-sm text-muted-foreground">1 pergunta • 3 etapas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Rascunho</Badge>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Link className="h-4 w-4" />
              Copiar link
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
            <Button size="sm" className="gap-2">
              <Share className="h-4 w-4" />
              Publicar
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-9 w-full">
              <TabsTrigger value="perguntas" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Perguntas
              </TabsTrigger>
              <TabsTrigger value="tema" className="gap-2">
                <Palette className="h-4 w-4" />
                Tema
              </TabsTrigger>
              <TabsTrigger value="editor" className="gap-2">
                <Edit className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="resultados" className="gap-2">
                <Target className="h-4 w-4" />
                Resultados
              </TabsTrigger>
              <TabsTrigger value="pixels" className="gap-2">
                <Code className="h-4 w-4" />
                Pixels
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="engajamento" className="gap-2">
                <Heart className="h-4 w-4" />
                Engajamento
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="gap-2">
                <Webhook className="h-4 w-4" />
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2">
                <Settings className="h-4 w-4" />
                Config
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - Quiz Steps & Components */}
        <div className="w-80 border-r bg-background p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Quiz Title */}
            <div>
              <h3 className="font-semibold mb-1">Novo Quiz</h3>
              <p className="text-sm text-muted-foreground">3 componentes na página • Todas as alterações salvas</p>
            </div>

            {/* Quiz Steps */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Etapas do Quiz</h4>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Plus className="h-3 w-3" />
                  Nova
                </Button>
              </div>
              
              <div className="space-y-2">
                {quizSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStep === step.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <span className="font-medium">{step.name}</span>
                    {step.number && (
                      <span className="text-sm opacity-70">{step.number}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Component Library */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Biblioteca de Componentes
              </h4>
              
              <div className="relative mb-3">
                <Input placeholder="Buscar componentes..." className="text-sm" />
              </div>

              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-3">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                  <TabsTrigger value="interacao">Interação</TabsTrigger>
                </TabsList>

                <TabsContent value="todos" className="space-y-4">
                  {componentLibrary.map((category) => (
                    <div key={category.category}>
                      <h5 className="font-medium text-sm mb-2">{category.category}</h5>
                      <div className="space-y-2 pl-3">
                        {category.items.length > 0 ? (
                          category.items.map((item, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                              {item}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground opacity-50">
                            Nenhum componente
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Center Content - Tab Content Area */}
        <div className="flex-1 bg-background overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            {/* Tab Contents */}
            <TabsContent value="perguntas" className="mt-0 h-full">
              <QuestionsTab />
            </TabsContent>

            <TabsContent value="tema" className="mt-0 h-full">
              <ThemeTab />
            </TabsContent>

            <TabsContent value="editor" className="mt-0 h-full">
              <EditorTab />
            </TabsContent>

            <TabsContent value="resultados" className="mt-0 h-full">
              <ResultsTab />
            </TabsContent>

            <TabsContent value="pixels" className="mt-0 h-full">
              <PixelsTab />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 h-full">
              <AnalyticsTab />
            </TabsContent>

            <TabsContent value="engajamento" className="mt-0 h-full">
              <EngagementTab />
            </TabsContent>

            <TabsContent value="webhooks" className="mt-0 h-full">
              <WebhooksTab />
            </TabsContent>

            <TabsContent value="config" className="mt-0 h-full">
              <ConfigTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Quiz Properties */}
        <div className="w-80 border-l bg-background p-4 overflow-y-auto">
          <div className="space-y-6">
            <h4 className="font-semibold">Propriedades do Quiz</h4>
            
            {/* Quiz Information */}
            <div>
              <h5 className="font-medium mb-3">Informações</h5>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Etapas:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Perguntas:</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">Rascunho</Badge>
                </div>
              </div>
            </div>

            {/* Applied Theme */}
            <div>
              <h5 className="font-medium mb-3">Tema Aplicado</h5>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-medium">Tema Personalizado</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Cores, fontes e estilos aplicados
                </p>
              </div>
            </div>

            {/* Preview */}
            <div>
              <h5 className="font-medium mb-3">Preview</h5>
              <p className="text-sm text-muted-foreground mb-3">
                O preview mostra exatamente como seu quiz será exibido quando publicado.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Abrir Preview Completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}