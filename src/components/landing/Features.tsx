import { Monitor, TrendingUp, Webhook, Palette, Trophy, Zap } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Preview multi-dispositivo",
    description: "Visualize como seu quiz aparece em desktop, tablet e mobile em tempo real."
  },
  {
    icon: TrendingUp,
    title: "Funil e heatmap por pergunta",
    description: "Análise detalhada de onde os usuários abandonam e quais perguntas geram mais engajamento."
  },
  {
    icon: Webhook,
    title: "Webhooks com logs e retries",
    description: "Integração robusta com logs detalhados, retry automático e monitoramento de falhas."
  },
  {
    icon: Palette,
    title: "Presets de temas e customização total",
    description: "Templates prontos e customização completa de cores, fontes e layouts."
  },
  {
    icon: Trophy,
    title: "Gamificação: XP e conquistas",
    description: "Sistema de pontos, níveis e conquistas para aumentar o engajamento dos usuários."
  },
  {
    icon: Zap,
    title: "Lógica condicional avançada",
    description: "Crie fluxos inteligentes com regras condicionais e resultados dinâmicos."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-background-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Recursos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              avançados
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Ferramentas profissionais para criar experiências únicas e maximizar seus resultados.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-background group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-foreground-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}