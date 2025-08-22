import { Brain, Search, Lightbulb, BookOpen, Share2, Zap, Shield, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../ui/Card/Card";
import  Badge  from "../../ui/Badge/Badge";
// Inline Badge Component



const features = [
  {
    icon: Brain,
    title: "AI-Powered Writing",
    description: "Advanced AI understands context and helps you write better notes with smart suggestions and completions.",
    badge: "Core Feature",
    color: "text-chart-1"
  },
  {
    icon: Search,
    title: "Intelligent Search",
    description: "Find anything instantly with AI-powered semantic search that understands meaning, not just keywords.",
    badge: "Enhanced",
    color: "text-chart-2"
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Get automatic insights, summaries, and connections between your notes powered by machine learning.",
    badge: "Smart",
    color: "text-chart-3"
  },
  {
    icon: BookOpen,
    title: "Auto Organization",
    description: "Your notes organize themselves into relevant categories and tags without any manual effort.",
    badge: "Automated",
    color: "text-chart-4"
  },
  {
    icon: Share2,
    title: "Seamless Sharing",
    description: "Collaborate with others in real-time and share your AI-enhanced notes effortlessly.",
    badge: "Collaboration",
    color: "text-chart-5"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant responses and real-time processing ensure your workflow never slows down.",
    badge: "Performance",
    color: "text-chart-1"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/20 relative">
       <div className="absolute inset-0 bg-gradient-to-r from-blue/5 via-chart-1/5 to-chart-2/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Supercharge Your Note-Taking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of note-taking with AI-powered features that adapt to your thinking style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden bg-card/50 border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted/30 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-chart-1" />
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-chart-2" />
            <span>Trusted by 10,000+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-chart-3" />
            <span>99.9% uptime guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}