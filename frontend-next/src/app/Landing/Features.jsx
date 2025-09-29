import {
  Code2,
  FileText,
  Layout,
  Zap,
  Image,
  Layers,
  Save,
  TrendingUp,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../ui/Card/Card";
import Badge from "../../ui/Badge/Badge";
// Inline Badge Component

const features = [
  {
    icon: FileText,
    title: "Version Control",
    description:
      "Track changes, restore previous versions, and collaborate with Git-style version history built-in.",
    badge: "Core Feature",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description:
      "Work together in real-time with teammates, share documents instantly, and track changes effortlessly.",
    badge: "Collaboration",
  },
  {
    icon: Layout,
    title: "Modern Interface",
    description:
      "A clean and distraction-free design that makes LaTeX editing intuitive and easy to navigate.",
    badge: "Design",
  },
  {
    icon: Code2,
    title: "Math Keyboard",
    description:
      "Insert equations and symbols effortlessly with an intuitive math keyboard designed for LaTeX users.",
    badge: "Productivity",
  },
  {
    icon: Zap,
    title: "Fast Compile & Preview",
    description:
      "Experience blazing-fast compile times and instant previews of your LaTeX documents.",
    badge: "Performance",
  },
  {
    icon: Image,
    title: "Image & Media Support",
    description:
      "Seamlessly insert images, tables, and figures with real-time rendering support.",
    badge: "Enhanced",
  },
  {
    icon: BookOpen,
    title: "Easy Toolset",
    description:
      "Access a daily-use LaTeX toolbar with syntax shortcuts, autocomplete, and one-click insertions.",
    badge: "Usability",
  },
  {
    icon: Save,
    title: "Real-Time Save",
    description:
      "Your work is saved automatically as you type, so you never lose progress.",
    badge: "Safety",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track your writing progress, word counts, and compilation history at a glance.",
    badge: "Tracking",
  },
];
export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24  relative  bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 blocks">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 ">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Supercharge Your LaTeX Experience
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Reimagine LaTeX with an AI assistant that simplifies complexity,
            accelerates your workflow, and empowers every researcher, student,
            and creator.{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="blocks relative overflow-hidden bg-card/50 border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg bg-muted/30 `}
                  >
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
        <div className="flex items-center gap-8 justify-center text-sm text-muted-foreground mt-8">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-chart-1" />
            <div>
              <span className="text-xs text-muted-foreground">
                Enterprise-grade safety
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-chart-2" />
            <div>
              <span className="text-xs text-muted-foreground">
                Ready-to-use LaTeX designs
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-chart-3" />
            <div>
              <span className="text-xs text-muted-foreground">
                Compile & preview instantly
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
