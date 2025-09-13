import { Zap, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">QUIZZ Elevado</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              A plataforma mais completa para criar quizzes interativos que convertem visitantes em clientes.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Produto</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Suporte</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Central de ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contato</h3>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@quizzelevado.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 QUIZZ Elevado. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}