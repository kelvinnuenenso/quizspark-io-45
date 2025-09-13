import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap, 
  Save,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';

interface ThemePreset {
  name: string;
  primary: string;
  secondary: string;
  background: string;
}

const themePresets: ThemePreset[] = [
  { name: 'Clássico Azul', primary: '#2563eb', secondary: '#3b82f6', background: '#ffffff' },
  { name: 'Elegante Roxo', primary: '#7c3aed', secondary: '#8b5cf6', background: '#ffffff' },
  { name: 'Minimalista Preto', primary: '#000000', secondary: '#374151', background: '#ffffff' },
  { name: 'Energia Laranja', primary: '#ea580c', secondary: '#fb923c', background: '#ffffff' },
  { name: 'Rosa Vibrante', primary: '#e11d48', secondary: '#f43f5e', background: '#ffffff' },
  { name: 'Ciano Elétrico', primary: '#0891b2', secondary: '#06b6d4', background: '#ffffff' },
  { name: 'Floresta Verde', primary: '#059669', secondary: '#10b981', background: '#ffffff' },
  { name: 'Oceano Profundo', primary: '#1e40af', secondary: '#3b82f6', background: '#f8fafc' },
];

export default function QuizTheme() {
  const [selectedPreset, setSelectedPreset] = useState('Clássico Azul');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customColors, setCustomColors] = useState({
    primary: '#2563eb',
    secondary: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937'
  });

  const getCurrentPreset = () => {
    return themePresets.find(preset => preset.name === selectedPreset) || themePresets[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🎨 Personalização Visual</h1>
          <p className="text-muted-foreground">Customize a aparência do seu quiz</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Salvar Tema
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="presets">Presets</TabsTrigger>
              <TabsTrigger value="colors">Cores</TabsTrigger>
              <TabsTrigger value="typography">Texto</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Temas Predefinidos</Label>
                <div className="grid grid-cols-2 gap-3">
                  {themePresets.map((preset) => (
                    <Card 
                      key={preset.name}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedPreset === preset.name ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedPreset(preset.name)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                        <p className="text-xs font-medium">{preset.name}</p>
                        <Button 
                          className="w-full mt-2 h-6 text-xs"
                          style={{ 
                            backgroundColor: preset.primary,
                            borderColor: preset.primary
                          }}
                        >
                          Botão de exemplo
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primary-color">Cor Principal</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="primary-color"
                      type="color"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({...customColors, primary: e.target.value})}
                      className="w-16 h-8 p-1 border rounded"
                    />
                    <Input
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({...customColors, primary: e.target.value})}
                      placeholder="#2563eb"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({...customColors, secondary: e.target.value})}
                      className="w-16 h-8 p-1 border rounded"
                    />
                    <Input
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({...customColors, secondary: e.target.value})}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="background-color">Cor de Fundo</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="background-color"
                      type="color"
                      value={customColors.background}
                      onChange={(e) => setCustomColors({...customColors, background: e.target.value})}
                      className="w-16 h-8 p-1 border rounded"
                    />
                    <Input
                      value={customColors.background}
                      onChange={(e) => setCustomColors({...customColors, background: e.target.value})}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Família da Fonte</Label>
                  <select className="w-full p-2 border rounded mt-1">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Lato</option>
                  </select>
                </div>

                <div>
                  <Label>Tamanho do Título</Label>
                  <Slider defaultValue={[24]} max={48} min={16} step={1} className="mt-2" />
                </div>

                <div>
                  <Label>Tamanho do Texto</Label>
                  <Slider defaultValue={[16]} max={24} min={12} step={1} className="mt-2" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="bold-titles" />
                  <Label htmlFor="bold-titles">Títulos em Negrito</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Estilo da Barra de Progresso</Label>
                  <select className="w-full p-2 border rounded mt-1">
                    <option>Linear</option>
                    <option>Circular</option>
                    <option>Pontos</option>
                    <option>Oculta</option>
                  </select>
                </div>

                <div>
                  <Label>Animações</Label>
                  <select className="w-full p-2 border rounded mt-1">
                    <option>Suave</option>
                    <option>Rápida</option>
                    <option>Sem animação</option>
                  </select>
                </div>

                <div>
                  <Label>Espaçamento</Label>
                  <Slider defaultValue={[16]} max={32} min={8} step={2} className="mt-2" />
                </div>

                <div>
                  <Label>Raio das Bordas</Label>
                  <Slider defaultValue={[8]} max={24} min={0} step={2} className="mt-2" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📱 Preview Interativo em Tempo Real
                </CardTitle>
                <div className="flex items-center gap-2">
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
              </div>
              <p className="text-sm text-muted-foreground">
                Clique nos botões para testar as funcionalidades
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 p-8 rounded-lg min-h-96">
                <div className={`mx-auto transition-all duration-300 ${
                  previewDevice === 'mobile' ? 'max-w-sm' : 
                  previewDevice === 'tablet' ? 'max-w-md' : 'max-w-2xl'
                }`}>
                  <div 
                    className="bg-white rounded-lg shadow-lg p-6"
                    style={{ backgroundColor: getCurrentPreset().background }}
                  >
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: getCurrentPreset().primary,
                          width: '33%'
                        }}
                      />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Progresso do Teste</p>
                      <p className="text-lg font-semibold mb-2">1 de 3</p>
                      
                      <h2 
                        className="text-2xl font-bold mb-4"
                        style={{ color: getCurrentPreset().primary }}
                      >
                        Pergunta 1 de 3
                      </h2>
                      
                      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold mb-2">🧠 Qual é a sua cor favorita?</h3>
                        <p className="text-muted-foreground text-sm">
                          Esta pergunta testa a aparência visual dos botões
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {['Azul', 'Verde', 'Vermelho', 'Roxo'].map((color, index) => (
                          <Button 
                            key={color}
                            variant="outline"
                            className="w-full h-12 text-lg transition-all hover:scale-105"
                            style={{
                              borderColor: getCurrentPreset().primary,
                              color: getCurrentPreset().primary
                            }}
                          >
                            {color}
                          </Button>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline">Voltar</Button>
                        <Button 
                          style={{ 
                            backgroundColor: getCurrentPreset().primary,
                            borderColor: getCurrentPreset().primary
                          }}
                        >
                          Próximo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}