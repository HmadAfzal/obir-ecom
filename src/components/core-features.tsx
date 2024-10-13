import { features } from "@/constants/features"

export default function CoreFeatures() {

  return (
    <section className="py-12 mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Obir</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className=" rounded-none shadow-none">
              <div className="flex p-2 flex-col items-center text-center">
                <feature.icon className="w-6 h-6 mb-4 text-primary" />
                <span className="text-xl font-semibold">{feature.title}</span>
              </div>
              <div>
                <p className="text-center text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
