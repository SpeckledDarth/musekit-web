import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge } from "@musekit/design-system";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out PassivePost",
    features: [
      "3 connected accounts",
      "30 AI posts/month",
      "Basic analytics",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "For solopreneurs growing their presence",
    features: [
      "10 connected accounts",
      "300 AI posts/month",
      "Advanced analytics",
      "Calendar view",
      "Post queue",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "$99",
    period: "/month",
    description: "For agencies and power users",
    features: [
      "Unlimited accounts",
      "Unlimited AI posts",
      "Full analytics suite",
      "Blog flywheel",
      "Autopilot mode",
      "Content intelligence",
      "Priority support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative hover-elevate ${
                plan.popular
                  ? "border-primary-500 shadow-lg shadow-primary-500/10 ring-1 ring-primary-500"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="h-5 w-5 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
