import { ArrowRight, Sparkles, Zap, BookOpen, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Inline Button Component
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 rounded-md px-8 text-base"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-chart-1/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border/20 mb-8">
          <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
          <span className="text-sm text-muted-foreground">Powered by Advanced AI</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Your AI-Powered
          <br />
          Note Companion
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Transform your thoughts into organized, intelligent notes with the power of AI. 
          Never lose an idea again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Link to="/main">  <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground group"
          >
            Start Generating Notes
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button></Link>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center px-4 py-2 rounded-full bg-muted/20 border border-border/20">
            <Zap className="w-4 h-4 mr-2 text-chart-1" />
            Instant AI Processing
          </div>
          <div className="flex items-center px-4 py-2 rounded-full bg-muted/20 border border-border/20">
            <BookOpen className="w-4 h-4 mr-2 text-chart-2" />
            Smart Organization
          </div>
          <div className="flex items-center px-4 py-2 rounded-full bg-muted/20 border border-border/20">
            <Sparkles className="w-4 h-4 mr-2 text-chart-3" />
            Contextual Insights
          </div>
        </div>
      </div>
    </section>
  );
}