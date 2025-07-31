import { ArrowRight, Sparkles } from "lucide-react";

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

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-chart-1/5 to-chart-2/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border/20 mb-6">
          <Sparkles className="w-4 h-4 text-chart-1 mr-2 animate-pulse" />
          <span className="text-sm text-muted-foreground">Join the AI Revolution</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-medium mb-6 bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
          Ready to Transform Your Notes?
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who have already revolutionized their note-taking with AI. 
          Start your journey today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground group"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>✨ No credit card required • 🚀 Setup in under 2 minutes • 🛡️ Enterprise-grade security</p>
        </div>
      </div>
    </section>
  );
}