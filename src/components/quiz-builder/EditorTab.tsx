import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Edit,
  Eye,
  Settings,
  Plus,
  Type,
  Image,
  Layout
} from 'lucide-react';

export default function EditorTab() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Editor de Quiz</h2>
            <p className="text-muted-foreground">Personalize a aparência e layout do seu quiz</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>

        {/* Layout Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Layout do Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="aspect-video bg-muted rounded mb-2"></div>
                <p className="text-sm font-medium">Layout Padrão</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="aspect-video bg-muted rounded mb-2"></div>
                <p className="text-sm font-medium">Layout Lateral</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="aspect-video bg-muted rounded mb-2"></div>
                <p className="text-sm font-medium">Layout Card</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Tipografia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fonte Principal</label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho da Fonte</label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Imagens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Imagem de Fundo</label>
                <div className="flex gap-2">
                  <Input placeholder="URL da imagem ou upload" className="flex-1" />
                  <Button variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo do Quiz</label>
                <div className="flex gap-2">
                  <Input placeholder="URL do logo ou upload" className="flex-1" />
                  <Button variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom CSS */}
        <Card>
          <CardHeader>
            <CardTitle>CSS Personalizado</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="/* Adicione seu CSS personalizado aqui */"
              className="min-h-[200px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}