import { User, Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jason M.",
      role: "Graduate Student",
      message:
        "The compilation are super fast. Even with auto-compilation on, everything works smoothly without any lag or errors!",
      star: 5,
    },
    {
      name: "Sophia L.",
      role: "Data Scientist",
      message:
        "Writing reports in LaTeX used to be painful, but Latexwriter’s clean interface and helpful tools make it almost enjoyable.",
      star: 4.5,
    },
    {
      name: "Amit K.",
      role: "Software Engineer",
      message:
        "I love the simplicity and speed. This Software lets me focus on content rather than fighting with formatting issues.",
      star: 4.5,
    },
    {
      name: "Clara W.",
      role: "Research Assistant",
      message:
        "The collaborative features are fantastic! Our team can work on papers simultaneously without any version conflicts.",
      star: 5,
    },
    {
      name: "Daniel T.",
      role: "Professor",
      message:
        "I recommend Latexwriter.com to all my students. It’s an excellent platform for learning LaTeX and creating professional-quality documents.",
      star: 5,
    },
    {
      name: "Nina S.",
      role: "Master’s Student",
      message:
        "The AI-based suggestions are surprisingly accurate. It helps me catch errors before they become problems.",
      star: 4,
    },
  ];

  return (
    <section className="py-16 md:py-24 w-full ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-950 mb-12 md:mb-16 blocks">
          What <span className="text-blue-600">Our Users</span> Are Saying
        </h2>

        <div className="grid md:grid-cols-3 gap-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="blocks bg-gray-50 p-6 rounded-2xl hover:shadow-lg  flex flex-col justify-between transition-all ease-in-out "
            >
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-chart-1 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 flex-1">{t.message}</p>

              <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500  ">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(t.star) ? "text-amber-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
