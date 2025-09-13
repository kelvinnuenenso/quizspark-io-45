import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Share, 
  Trash2, 
  Plus, 
  Monitor, 
  Tablet, 
  Smartphone,
  Settings,
  Palette,
  BarChart3,
  Zap,
  Code,
  Target,
  Heart,
  Webhook
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizStep {
  id: string;
  type: 'intro' | 'question' | 'result';
  title: string;
  content?: string;
}

const mockQuizSteps: QuizStep[] = [
  { id: '1', type: 'intro', title: 'Introdução', content: 'Novo Quiz' },
  { id: '2', type: 'question', title: 'Pergunta 1' },
  { id: '3', type: 'result', title: 'Resultado' }
];

export default function QuizEditor() {
  const [quizTitle, setQuizTitle] = useState('Novo Quiz');
  const [selectedStep, setSelectedStep] = useState('1');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getDeviceIcon = () => {
    switch (previewDevice) {
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{quizTitle}</h1>
              <p className="text-xs text-muted-foreground">
                1 perguntas • 3 etapas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">Rascunho</Badge>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Copiar link
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Publicar
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t">
          <div className="flex items-center gap-6 px-6">
            <Link to="/dashboard/questions" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
              Perguntas
            </Link>
            <Link to="/dashboard/theme" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Palette className="h-4 w-4" />
              Tema
            </Link>
            <Link to="/dashboard/editor" className="flex items-center gap-2 py-3 text-sm font-medium text-primary border-b-2 border-primary">
              <Zap className="h-4 w-4" />
              Editor
            </Link>
            <Link to="/dashboard/results" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Target className="h-4 w-4" />
              Resultados
            </Link>
            <Link to="/dashboard/pixels" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Code className="h-4 w-4" />
              Pixels
            </Link>
            <Link to="/dashboard/analytics" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link to="/dashboard/engagement" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Heart className="h-4 w-4" />
              Engajamento
            </Link>
            <Link to="/dashboard/webhooks" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Webhook className="h-4 w-4" />
              Webhooks
            </Link>
            <Link to="/dashboard/config" className="flex items-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
              Config
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-129px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r bg-background">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Novo Quiz</h2>
              <span className="text-xs text-muted-foreground">3 componentes na página • Todas as alterações salvas</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Rascunho</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">↻</Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">↺</Button>
              <span>Sincronizar</span>
            </div>
          </div>

          {/* Quiz Steps */}
          <div className="p-4">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Etapas do Quiz</h3>
                <Button size="sm" variant="ghost" className="h-8">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova
                </Button>
              </div>
              
              <div className="space-y-1">
                {mockQuizSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      selectedStep === step.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{step.title}</span>
                      {step.id === '1' && <span className="text-xs">▶</span>}
                    </div>
                    <span className="text-xs">{index === 1 ? '1' : index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Library */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">📚 Biblioteca de Componentes</h3>
              <Input placeholder="Buscar componentes..." className="text-sm" />
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 text-xs">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="interaction">Interação</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-2 mt-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      📱 Social
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      📊 Visualização
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      ⚡ Efeitos
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      ⚙️ Estrutura
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      📝 Texto
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      📋 Título
                    </div>
                    <div className="p-2 border rounded text-xs cursor-pointer hover:bg-muted">
                      🖼️ Imagem
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Preview Controls */}
          <div className="flex items-center justify-center gap-2 p-2 border-b bg-muted/20">
            <Button 
              variant={previewDevice === 'desktop' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setPreviewDevice('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button 
              variant={previewDevice === 'tablet' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setPreviewDevice('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              variant={previewDevice === 'mobile' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setPreviewDevice('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-8 bg-muted/10 overflow-auto">
            <div className={`mx-auto bg-white rounded-lg shadow-lg transition-all duration-300 ${
              previewDevice === 'mobile' ? 'max-w-sm' : 
              previewDevice === 'tablet' ? 'max-w-md' : 'max-w-2xl'
            }`}>
              <div className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">{quizTitle}</h1>
                <p className="text-lg text-muted-foreground mb-2">1 de 3</p>
                <h2 className="text-2xl font-semibold mb-4">Qual é a sua cor favorita?</h2>
                <p className="text-muted-foreground mb-8">Esta pergunta testa a aparência visual dos botões</p>
                
                <div className="space-y-3">
                  {['Azul', 'Verde', 'Vermelho', 'Roxo'].map((color) => (
                    <Button 
                      key={color} 
                      variant="outline" 
                      className="w-full h-12 text-lg"
                    >
                      {color}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline">Voltar</Button>
                  <Button>Próximo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l bg-background">
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-2">Propriedades do Quiz</h3>
          </div>
          
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">ℹ️ Informações</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Etapas:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span>Perguntas:</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span>Rascunho</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">🎨 Tema Aplicado</h4>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm">Tema Personalizado</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cores, fontes e estilos aplicados</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">👁️ Preview</h4>
              <p className="text-xs text-muted-foreground mb-2">
                O preview mostra exatamente como seu quiz será exibido quando publicado.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Abrir Preview Completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}