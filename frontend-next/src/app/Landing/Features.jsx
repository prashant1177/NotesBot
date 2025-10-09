import {
  FileText,
  BookOpen,
  Calculator,
  PenTool,
  FileCode,
  BookMarked,
  Layout,
  FileSearch,
  Globe,
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
    title: "Academic Papers",
    description:
      "Write research papers, theses, and dissertations with professional formatting and citation control.",
    badge: "Education",
  },
  {
    icon: BookOpen,
    title: "Scientific Journals",
    description:
      "Create complex scientific documents with equations, figures, and tables that meet publication standards.",
    badge: "Research",
  },
  {
    icon: Calculator,
    title: "Mathematical Documents",
    description:
      "Write and format equations, proofs, and formulas with precision using LaTeX’s powerful math syntax.",
    badge: "STEM",
  },
  {
    icon: PenTool,
    title: "Resumes & CVs",
    description:
      "Build structured, ATS-friendly resumes and CVs with LaTeX templates for academic or industry use.",
    badge: "Career",
  },
  {
    icon: FileCode,
    title: "Technical Reports",
    description:
      "Generate detailed project or lab reports with sections, citations, and diagrams in a clean layout.",
    badge: "Engineering",
  },
  {
    icon: BookMarked,
    title: "Books & E-Books",
    description:
      "Publish books with chapter management, indexes, and consistent typography using LaTeX classes.",
    badge: "Publishing",
  },
  {
    icon: Layout,
    title: "Templates & Forms",
    description:
      "Design reusable templates for certificates, invoices, and forms with precise formatting.",
    badge: "Design",
  },
  {
    icon: FileSearch,
    title: "Research Proposals",
    description:
      "Prepare formal research or grant proposals with professional citations and consistent structure.",
    badge: "Academia",
  },
  {
    icon: Globe,
    title: "Multilingual Documents",
    description:
      "Write and publish documents in any language with full Unicode and RTL support in LaTeX.",
    badge: "Global",
  },
];

export function FeaturesSection() {
  return (
    <section className="pt-16  relative  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mb-16 ">
                  <Badge variant="outline" className="mb-4 ">
                    Why LaTeX
                  </Badge>
                  <h3 className="  text-5xl lg:text-6xl  mb-4 text-black blocksnone">
Real-World Applications of LaTeX                  </h3>
                </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className=" relative overflow-hidden bg-card/50 border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted/30 `}>
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

        {/* Trust Indicators 
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
        </div>*/}
      </div>
    </section>
  );
}
