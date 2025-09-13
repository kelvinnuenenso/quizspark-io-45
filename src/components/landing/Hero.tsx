import { HeroButton } from "@/components/ui/hero-button";
import { PlayCircle, Zap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-subtle to-background-muted overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-purple/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                +10k usuários • 4.9/5 avaliação • +87% mais conversões
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Crie quizzes que{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  convertem
                </span>{" "}
                em minutos
              </h1>
              
              <p className="text-xl lg:text-2xl text-foreground-muted leading-relaxed">
                <strong className="text-foreground">QUIZZ Elevado</strong> transforma visitantes em clientes com quizzes interativos, leads no WhatsApp/CRM e analytics em tempo real.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButton variant="primary" size="lg" className="group" asChild>
                <Link to="/login">
                  Começar grátis
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </HeroButton>
              
              <HeroButton variant="secondary" size="lg" className="group">
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver demonstração
              </HeroButton>
            </div>
            
            <div className="pt-8 text-sm text-foreground-subtle">
              Teste em 2 minutos • Sem cartão de crédito
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-scale-in animation-delay-300">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-glow" />
            <img 
              src={heroImage} 
              alt="QUIZZ Elevado Platform Preview" 
              className="relative z-10 w-full h-auto rounded-3xl shadow-hero hover:shadow-glow transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}