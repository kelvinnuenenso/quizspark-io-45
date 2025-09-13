import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Copy, 
  Settings,
  CheckCircle,
  Circle,
  Star,
  Sliders,
  Type,
  Mail,
  Phone,
  Calendar,
  Hash,
  BarChart3,
  ThumbsUp
} from 'lucide-react';

interface Question {
  id: string;
  type: string;
  title: string;
  description?: string;
  required: boolean;
  options: QuestionOption[];
  settings: QuestionSettings;
}

interface QuestionOption {
  id: string;
  text: string;
  points: number;
  nextAction?: string;
}

interface QuestionSettings {
  randomizeOptions: boolean;
  timeLimit?: number;
  allowMultiple: boolean;
  showPoints: boolean;
}

const questionTypes = [
  { id: 'multiple_choice', name: 'Múltipla Escolha', icon: CheckCircle, description: 'Uma opção por resposta' },
  { id: 'multiple_select', name: 'Seleção Múltipla', icon: Circle, description: 'Várias opções por resposta' },
  { id: 'rating', name: 'Avaliação', icon: Star, description: 'Escala de 1 a 5 estrelas' },
  { id: 'slider', name: 'Controle Deslizante', icon: Sliders, description: 'Valor numa escala' },
  { id: 'text', name: 'Texto Curto', icon: Type, description: 'Campo de texto simples' },
  { id: 'textarea', name: 'Texto Longo', icon: Type, description: 'Campo de texto expandido' },
  { id: 'email', name: 'E-mail', icon: Mail, description: 'Campo de e-mail validado' },
  { id: 'phone', name: 'Telefone', icon: Phone, description: 'Campo de telefone' },
  { id: 'date', name: 'Data', icon: Calendar, description: 'Seletor de data' },
  { id: 'number', name: 'Número', icon: Hash, description: 'Campo numérico' },
  { id: 'nps', name: 'NPS', icon: BarChart3, description: 'Net Promoter Score 0-10' },
  { id: 'yes_no', name: 'Sim/Não', icon: ThumbsUp, description: 'Pergunta binária' },
  { id: 'ranking', name: 'Classificação', icon: BarChart3, description: 'Ordenar opções por preferência' },
  { id: 'matrix', name: 'Matriz', icon: BarChart3, description: 'Múltiplas perguntas em grade' }
];

export default function QuestionsTab() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'multiple_choice',
      title: 'Qual é a sua cor favorita?',
      description: 'Esta pergunta testa a aparência visual dos botões',
      required: true,
      options: [
        { id: '1', text: 'Azul', points: 10 },
        { id: '2', text: 'Verde', points: 8 },
        { id: '3', text: 'Vermelho', points: 6 },
        { id: '4', text: 'Roxo', points: 4 }
      ],
      settings: {
        randomizeOptions: false,
        allowMultiple: false,
        showPoints: false
      }
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<string>('1');
  const [newQuestionType, setNewQuestionType] = useState<string>('');

  const addQuestion = (type: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: 'Nova Pergunta',
      required: false,
      options: type === 'multiple_choice' || type === 'multiple_select' ? [
        { id: '1', text: 'Opção 1', points: 0 },
        { id: '2', text: 'Opção 2', points: 0 }
      ] : [],
      settings: {
        randomizeOptions: false,
        allowMultiple: type === 'multiple_select',
        showPoints: false
      }
    };
    
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion.id);
    setNewQuestionType('');
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newOption: QuestionOption = {
      id: Date.now().toString(),
      text: `Opção ${question.options.length + 1}`,
      points: 0
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption]
    });
  };

  const updateOption = (questionId: string, optionId: string, updates: Partial<QuestionOption>) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map(opt =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const removeOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || question.options.length <= 2) return;

    const updatedOptions = question.options.filter(opt => opt.id !== optionId);
    updateQuestion(questionId, { options: updatedOptions });
  };

  const duplicateQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const duplicatedQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      title: question.title + ' (Cópia)'
    };

    setQuestions([...questions, duplicatedQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    if (selectedQuestion === questionId) {
      setSelectedQuestion(questions.find(q => q.id !== questionId)?.id || '');
    }
  };

  const selectedQuestionData = questions.find(q => q.id === selectedQuestion);
  const selectedQuestionType = questionTypes.find(t => t.id === selectedQuestionData?.type);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Gerenciar Perguntas</h2>
        <p className="text-muted-foreground">
          Crie e configure perguntas para seu quiz. Arraste para reordenar.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Questions List */}
        <div className="col-span-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Perguntas ({questions.length})</h3>
              <Select value={newQuestionType} onValueChange={setNewQuestionType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Adicionar pergunta" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newQuestionType && (
              <Card className="border-primary">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Button onClick={() => addQuestion(newQuestionType)} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar {questionTypes.find(t => t.id === newQuestionType)?.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {questions.map((question, index) => (
                <Card 
                  key={question.id}
                  className={`cursor-pointer transition-colors ${
                    selectedQuestion === question.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedQuestion(question.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {questionTypes.find(t => t.id === question.type)?.name}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm truncate">{question.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {question.options.length > 0 ? `${question.options.length} opções` : 'Campo de entrada'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateQuestion(question.id);
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(question.id);
                          }}
                          disabled={questions.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Question Editor */}
        <div className="col-span-8">
          {selectedQuestionData && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedQuestionType && <selectedQuestionType.icon className="h-5 w-5" />}
                  <CardTitle>{selectedQuestionType?.name}</CardTitle>
                  <Badge variant="outline">{selectedQuestionType?.description}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList>
                    <TabsTrigger value="content">Conteúdo</TabsTrigger>
                    <TabsTrigger value="options">Opções</TabsTrigger>
                    <TabsTrigger value="settings">Configurações</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título da Pergunta *</Label>
                      <Input
                        id="title"
                        value={selectedQuestionData.title}
                        onChange={(e) => updateQuestion(selectedQuestion, { title: e.target.value })}
                        placeholder="Digite o título da pergunta"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição (opcional)</Label>
                      <Textarea
                        id="description"
                        value={selectedQuestionData.description || ''}
                        onChange={(e) => updateQuestion(selectedQuestion, { description: e.target.value })}
                        placeholder="Adicione uma descrição explicativa"
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="options" className="space-y-4">
                    {selectedQuestionData.options.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Opções de Resposta</Label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addOption(selectedQuestion)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Opção
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {selectedQuestionData.options.map((option, index) => (
                            <div key={option.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <span className="text-sm text-muted-foreground min-w-[20px]">
                                {index + 1}.
                              </span>
                              <Input
                                value={option.text}
                                onChange={(e) => updateOption(selectedQuestion, option.id, { text: e.target.value })}
                                placeholder={`Opção ${index + 1}`}
                                className="flex-1"
                              />
                              <div className="flex items-center gap-2">
                                <Label htmlFor={`points-${option.id}`} className="text-xs">
                                  Pontos:
                                </Label>
                                <Input
                                  id={`points-${option.id}`}
                                  type="number"
                                  value={option.points}
                                  onChange={(e) => updateOption(selectedQuestion, option.id, { points: parseInt(e.target.value) || 0 })}
                                  className="w-20"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(selectedQuestion, option.id)}
                                disabled={selectedQuestionData.options.length <= 2}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Type className="h-8 w-8 mx-auto mb-2" />
                        <p>Este tipo de pergunta não possui opções configuráveis.</p>
                        <p className="text-sm">Os usuários digitarão suas respostas diretamente.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="required"
                          checked={selectedQuestionData.required}
                          onChange={(e) => updateQuestion(selectedQuestion, { required: e.target.checked })}
                        />
                        <Label htmlFor="required">Pergunta obrigatória</Label>
                      </div>

                      {selectedQuestionData.options.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="randomize"
                            checked={selectedQuestionData.settings.randomizeOptions}
                            onChange={(e) => updateQuestion(selectedQuestion, {
                              settings: { ...selectedQuestionData.settings, randomizeOptions: e.target.checked }
                            })}
                          />
                          <Label htmlFor="randomize">Randomizar opções</Label>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="showPoints"
                          checked={selectedQuestionData.settings.showPoints}
                          onChange={(e) => updateQuestion(selectedQuestion, {
                            settings: { ...selectedQuestionData.settings, showPoints: e.target.checked }
                          })}
                        />
                        <Label htmlFor="showPoints">Mostrar pontos</Label>
                      </div>

                      {selectedQuestionData.type === 'multiple_select' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="allowMultiple"
                            checked={selectedQuestionData.settings.allowMultiple}
                            onChange={(e) => updateQuestion(selectedQuestion, {
                              settings: { ...selectedQuestionData.settings, allowMultiple: e.target.checked }
                            })}
                          />
                          <Label htmlFor="allowMultiple">Permitir múltiplas seleções</Label>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="timeLimit">Limite de tempo (segundos)</Label>
                      <Input
                        id="timeLimit"
                        type="number"
                        value={selectedQuestionData.settings.timeLimit || ''}
                        onChange={(e) => updateQuestion(selectedQuestion, {
                          settings: { 
                            ...selectedQuestionData.settings, 
                            timeLimit: e.target.value ? parseInt(e.target.value) : undefined 
                          }
                        })}
                        placeholder="Sem limite"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}