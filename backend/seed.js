const Note = require("./models/note.js");
const mongoose = require("mongoose");

database()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function database() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/writingnotes`);
}

const notesData = [
  {
    title: "The Future of Artificial Intelligence",
    about: "Exploring how AI is transforming industries and everyday life.",
    content:
      "Artificial Intelligence is reshaping industries from healthcare to finance. With advancements in deep learning and NLP, AI systems are becoming more adaptive and human-like...",
    reference: [
      {
        title: "AI in Healthcare",
        details: "Use cases of AI for diagnosis and patient care",
        link: "https://www.nature.com/articles/ai-health",
      },
    ],
    topics: ["AI", "Technology", "Future"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "Sustainable Energy in 2025",
    about: "The importance of renewable energy and global adoption trends.",
    content:
      "Renewable energy is projected to surpass fossil fuels in capacity by 2030. Solar, wind, and hydro are leading the revolution...",
    reference: [
      {
        title: "Renewable Energy Report",
        details: "IEA global energy outlook",
        link: "https://www.iea.org/reports/renewables",
      },
    ],
    topics: ["Environment", "Sustainability", "Energy"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "Mental Health in the Digital Age",
    about:
      "How social media and constant connectivity impact mental well-being.",
    content:
      "Social media has drastically changed the way people interact. While it connects us globally, it also introduces issues such as anxiety, stress, and reduced self-esteem...",
    reference: [
      {
        title: "WHO Mental Health Report",
        details: "Global mental health insights",
        link: "https://www.who.int/mental-health",
      },
    ],
    topics: ["Health", "Psychology", "Technology"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "The Rise of Remote Work",
    about: "How remote work is shaping the future of employment.",
    content:
      "Remote work, once a luxury, has become mainstream after the pandemic. It offers flexibility, cost savings, and global collaboration...",
    reference: [
      {
        title: "Future of Work",
        details: "Harvard Business Review article",
        link: "https://hbr.org/future-of-work",
      },
    ],
    topics: ["Work", "Technology", "Lifestyle"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "Blockchain Beyond Cryptocurrency",
    about: "Exploring blockchain applications outside Bitcoin and Ethereum.",
    content:
      "Blockchain technology is now used in supply chains, healthcare, voting systems, and identity verification. Its transparency and immutability make it powerful...",
    reference: [
      {
        title: "Blockchain in Supply Chain",
        details: "Case studies in logistics",
        link: "https://www.ibm.com/blockchain",
      },
    ],
    topics: ["Blockchain", "Technology", "Innovation"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "Cybersecurity in 2025",
    about: "Emerging threats and strategies for defense.",
    content:
      "With the growth of IoT, cloud, and AI systems, cyberattacks are becoming more sophisticated. Zero trust architecture and quantum encryption are the future...",
    reference: [
      {
        title: "Cybersecurity Ventures Report",
        details: "Global predictions on cybercrime",
        link: "https://cybersecurityventures.com",
      },
    ],
    topics: ["Security", "Technology", "Internet"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "The Importance of Publishing Research Papers",
    about: "Why research papers matter for academia and industry.",
    content:
      "Publishing papers is crucial for academic recognition, collaboration, and industry innovation. Challenges include peer review delays, plagiarism concerns, and paywalls...",
    reference: [
      {
        title: "Springer Guide",
        details: "How to publish research papers",
        link: "https://www.springer.com/guides/research",
      },
    ],
    topics: ["Education", "Research", "Publishing"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "Climate Change and Global Action",
    about: "The impact of climate change and worldwide efforts to combat it.",
    content:
      "Rising temperatures, melting glaciers, and extreme weather events highlight the urgency of climate action. Policies like the Paris Agreement play a key role...",
    reference: [
      {
        title: "IPCC Climate Report",
        details: "Latest climate science data",
        link: "https://www.ipcc.ch/reports",
      },
    ],
    topics: ["Climate", "Environment", "Policy"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "The Evolution of E-Commerce",
    about: "How e-commerce platforms have changed retail.",
    content:
      "From Amazon to Shopify, e-commerce is booming. Personalized shopping, AI recommendations, and AR fitting rooms are becoming mainstream...",
    reference: [
      {
        title: "E-Commerce Trends 2025",
        details: "McKinsey digital retail insights",
        link: "https://www.mckinsey.com/ecommerce",
      },
    ],
    topics: ["E-Commerce", "Business", "Technology"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
  {
    title: "The Role of Education in Nation Building",
    about: "How education empowers societies and drives progress.",
    content:
      "Education is the foundation of development. It empowers individuals, promotes innovation, and strengthens democracy...",
    reference: [
      {
        title: "UNESCO Education Report",
        details: "Global education statistics",
        link: "https://www.unesco.org/education",
      },
    ],
    topics: ["Education", "Society", "Development"],
    createdBy: "68a85eefe3c52721d9c2968e",
  },
];

async function seedNotes() {
  try {
    await Note.deleteMany({});
    console.log("🗑️ Existing notes cleared");

    const inserted = await Note.insertMany(notesData);
    console.log(`✅ Inserted ${inserted.length} notes`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding notes:", error);
    mongoose.connection.close();
  }
}

seedNotes();
