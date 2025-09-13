import { HeroButton } from "@/components/ui/hero-button";
import { ArrowRight, Clock } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark via-dark to-primary/90 text-dark-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-purple/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Transforme seu conhecimento em{" "}
            <span className="bg-gradient-to-r from-white to-accent-purple bg-clip-text text-transparent">
              quizzes que vendem
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed">
            Com o QUIZZ Elevado, crie quizzes interativos em minutos — conecte direto ao WhatsApp e ao seu CRM.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Criação fácil drag-and-drop</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Captura de leads integrada</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Analytics avançado em tempo real</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Gamificação que engaja</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Integração com WhatsApp e CRMs</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Responsividade total</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <HeroButton 
              variant="primary" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 shadow-xl group"
            >
              Começar grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </HeroButton>
            
            <HeroButton 
              variant="secondary" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:scale-105"
            >
              Ver demonstração
            </HeroButton>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-white/70">
            <Clock className="w-4 h-4" />
            <span>Teste em 2 minutos • Sem cartão de crédito</span>
          </div>
        </div>
      </div>
    </section>
  );
}