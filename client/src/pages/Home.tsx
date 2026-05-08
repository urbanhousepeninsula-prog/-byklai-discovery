import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <div className="font-serif font-bold text-xl">Byklai</div>
          <Link href="/discovery">
            <Button variant="default">Discovery</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">
              Ingeniería de Sistemas Digitales
            </h1>
            <p className="text-xl text-muted-foreground">
              Automatización, branding, y sistemas escalables para tu negocio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/discovery">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Iniciar Discovery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Ver Portafolio
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Automatización",
              description: "Flujos de trabajo inteligentes que ahorran tiempo y recursos.",
            },
            {
              title: "Sistemas Digitales",
              description: "Plataformas escalables construidas con tecnología moderna.",
            },
            {
              title: "Branding Digital",
              description: "Identidad visual coherente en todos tus canales digitales.",
            },
          ].map((service, i) => (
            <div key={i} className="p-6 border border-border rounded-lg hover:border-foreground/50 transition-colors">
              <h3 className="font-serif font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Byklai. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
