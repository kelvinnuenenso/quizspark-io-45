import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Move3D, 
  HelpCircle,
  CheckSquare,
  Circle,
  BarChart3,
  GitBranch,
  Save
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'multiple' | 'open' | 'scale' | 'conditional';
  title: string;
  description?: string;
  options?: string[];
  points?: number[];
  required: boolean;
}

const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple',
    title: 'Qual é o seu objetivo principal com marketing digital?',
    description: 'Selecione a opção que melhor descreve sua situação atual',
    options: ['Gerar mais leads', 'Aumentar vendas', 'Melhorar branding', 'Engajar audiência'],
    points: [10, 8, 6, 4],
    required: true
  },
  {
    id: '2', 
    type: 'scale',
    title: 'Como você avalia seu conhecimento em redes sociais?',
    description: 'De 1 a 5, sendo 1 iniciante e 5 especialista',
    required: true
  },
  {
    id: '3',
    type: 'open',
    title: 'Descreva seu maior desafio em marketing',
    description: 'Seja específico para recebermos uma resposta personalizada',
    required: false
  }
];

const questionTypes = [
  { type: 'multiple', icon: CheckSquare, label: 'Múltipla Escolha', description: 'Várias opções, uma resposta' },
  { type: 'open', icon: Edit, label: 'Resposta Aberta', description: 'Campo de texto livre' },
  { type: 'scale', icon: BarChart3, label: 'Escala', description: 'Avaliação numérica' },
  { type: 'conditional', icon: GitBranch, label: 'Lógica Condicional', description: 'Pergunta baseada em resposta anterior' }
];

export default function QuizQuestions() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(mockQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>('1');
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const getQuestionTypeIcon = (type: string) => {
    const questionType = questionTypes.find(qt => qt.type === type);
    if (!questionType) return HelpCircle;
    return questionType.icon;
  };

  const getQuestionTypeLabel = (type: string) => {
    const questionType = questionTypes.find(qt => qt.type === type);
    return questionType?.label || 'Desconhecido';
  };

  const selectedQuestionData = questions.find(q => q.id === selectedQuestion);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">❓ Gerenciar Perguntas</h1>
          <p className="text-muted-foreground">
            Configure as perguntas do seu quiz e defina a pontuação
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          <Button onClick={() => setShowAddQuestion(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Pergunta
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lista de Perguntas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questions.map((question, index) => {
                  const IconComponent = getQuestionTypeIcon(question.type);
                  return (
                    <div
                      key={question.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                        selectedQuestion === question.id ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 mt-1">
                            <Move3D className="h-4 w-4 text-muted-foreground cursor-grab" />
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground">#{index + 1}</span>
                              <Badge variant="secondary" className="text-xs">
                                {getQuestionTypeLabel(question.type)}
                              </Badge>
                              {question.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Obrigatória
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-medium line-clamp-2">
                              {question.title}
                            </p>
                            {question.options && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {question.options.length} opções
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Add Question Button */}
                <Button
                  variant="outline"
                  className="w-full h-20 border-2 border-dashed"
                  onClick={() => setShowAddQuestion(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar Nova Pergunta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Editor */}
        <div className="lg:col-span-2">
          {selectedQuestionData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Editando Pergunta #{questions.findIndex(q => q.id === selectedQuestion) + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Conteúdo</TabsTrigger>
                    <TabsTrigger value="options">Opções</TabsTrigger>
                    <TabsTrigger value="logic">Lógica</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="question-type">Tipo da Pergunta</Label>
                      <select
                        id="question-type"
                        className="w-full p-2 border rounded mt-1"
                        value={selectedQuestionData.type}
                      >
                        {questionTypes.map((type) => (
                          <option key={type.type} value={type.type}>
                            {type.label} - {type.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="question-title">Título da Pergunta</Label>
                      <Input
                        id="question-title"
                        value={selectedQuestionData.title}
                        placeholder="Digite o título da pergunta..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="question-description">Descrição (opcional)</Label>
                      <Textarea
                        id="question-description"
                        value={selectedQuestionData.description || ''}
                        placeholder="Adicione uma descrição para ajudar o usuário..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="required"
                        checked={selectedQuestionData.required}
                      />
                      <Label htmlFor="required">Pergunta obrigatória</Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="options" className="space-y-4">
                    {selectedQuestionData.type === 'multiple' && (
                      <div>
                        <Label className="text-base font-medium">Opções de Resposta</Label>
                        <div className="space-y-3 mt-2">
                          {selectedQuestionData.options?.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground w-8">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <Input
                                value={option}
                                placeholder={`Opção ${index + 1}...`}
                                className="flex-1"
                              />
                              <Input
                                type="number"
                                value={selectedQuestionData.points?.[index] || 0}
                                placeholder="Pts"
                                className="w-16"
                              />
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Opção
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedQuestionData.type === 'scale' && (
                      <div className="space-y-4">
                        <div>
                          <Label>Escala de Avaliação</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <div>
                              <Label className="text-xs">Mínimo</Label>
                              <Input type="number" defaultValue="1" className="w-20" />
                            </div>
                            <div>
                              <Label className="text-xs">Máximo</Label>
                              <Input type="number" defaultValue="5" className="w-20" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>Labels (opcional)</Label>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <Input placeholder="Label mínimo (ex: Ruim)" />
                            <Input placeholder="Label máximo (ex: Excelente)" />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedQuestionData.type === 'open' && (
                      <div className="space-y-4">
                        <div>
                          <Label>Configurações do Campo</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                              <Switch id="multiline" />
                              <Label htmlFor="multiline">Múltiplas linhas</Label>
                            </div>
                            <div>
                              <Label className="text-sm">Limite de caracteres</Label>
                              <Input type="number" placeholder="500" className="w-32 mt-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="logic" className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Lógica Condicional</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure quando esta pergunta deve aparecer baseada em respostas anteriores
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch id="conditional" />
                          <Label htmlFor="conditional">Ativar lógica condicional</Label>
                        </div>
                        
                        <div className="pl-6 space-y-3 opacity-50">
                          <div>
                            <Label>Mostrar esta pergunta SE:</Label>
                            <select className="w-full p-2 border rounded mt-1">
                              <option>Selecione uma pergunta anterior...</option>
                              <option>Pergunta #1 - Objetivo principal</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label>Operador:</Label>
                            <select className="w-full p-2 border rounded mt-1">
                              <option>é igual a</option>
                              <option>é diferente de</option>
                              <option>contém</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label>Valor:</Label>
                            <Input placeholder="Digite o valor..." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Selecione uma pergunta para editar</p>
                  <p className="text-muted-foreground">
                    Clique em uma pergunta na lista ao lado para começar a editá-la
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}