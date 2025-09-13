import { Edit3, Rocket, Users } from "lucide-react";
import iconEditor from "@/assets/icon-editor.jpg";
import iconAnalytics from "@/assets/icon-analytics.jpg";
import iconWhatsapp from "@/assets/icon-whatsapp.jpg";

const steps = [
  {
    number: "01",
    icon: Edit3,
    image: iconEditor,
    title: "Crie",
    subtitle: "Editor visual com templates prontos",
    description: "Use nosso editor drag-and-drop intuitivo com templates profissionais. Adicione perguntas, customize o design e configure a lógica em minutos."
  },
  {
    number: "02", 
    icon: Rocket,
    image: iconAnalytics,
    title: "Lance",
    subtitle: "Publique e compartilhe em 1 clique",
    description: "Publique seu quiz instantaneamente e compartilhe via link, QR code ou embed. Acompanhe performance em tempo real com analytics detalhados."
  },
  {
    number: "03",
    icon: Users,
    image: iconWhatsapp,
    title: "Converta", 
    subtitle: "Leads vão direto para WhatsApp/CRM",
    description: "Conecte automaticamente com WhatsApp, CRMs e ferramentas de marketing. Transforme respostas em leads qualificados instantaneamente."
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como funciona o{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              QUIZZ Elevado
            </span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Em apenas 3 passos simples, você cria quizzes profissionais que capturam leads e aumentam suas conversões.
          </p>
        </div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6 animate-fade-in">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-primary/20">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xl text-primary font-semibold mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-lg text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-1 relative animate-scale-in">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20" />
                <div className="relative bg-white p-8 rounded-3xl shadow-lift hover:shadow-hero transition-all duration-500 hover:scale-105">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}