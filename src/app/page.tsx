import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">AR Home Renovation Planner</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Visualize your home renovation ideas in augmented reality. Plan layouts,
        place furniture, and get design suggesstions all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="text-primary mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="mb-4">{feature.description}</p>
            <Link href={feature.link}>
              <Button variant="primary">{feature.cta}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "AT Room Scanning",
    description: "Scan your room and visualize changes in augmented reality",
    icon: <div className="text-3xl">📱</div>,
    link: "/ar-scan",
    cta: "Start Scanning",
  },
  {
    title: "Furniture Library",
    description: "Browse and place 3D furniture models in your space.",
    icon: <div className="text-3xl">🛋️</div>,
    link: "/furniture-library",
    cta: "Browse Furniture",
  },
  {
    title: "Design Suggestions",
    description: "Get AI-powered design recommendations for your space.",
    icon: <div className="text-3xl">💡</div>,
    link: "/suggestions",
    cta: "Get Ideas",
  },
  {
    title: "Cost Estimation",
    description: "Calculate the total cost of your renovation project.",
    icon: <div className="text-3xl">💰</div>,
    link: "/cost",
    cta: "Estimate Costs",
  },
  {
    title: "Contractor Match",
    description: "Find nearby contractors for your renovation project.",
    icon: <div className="text-3xl">👷</div>,
    link: "/contractors",
    cta: "Find Contractors",
  },
  {
    title: "Sustainability",
    description: "Measure the environmental impact of your choices.",
    icon: <div className="text-3xl">🌱</div>,
    link: "/sustainability",
    cta: "Check Impact",
  },
];
