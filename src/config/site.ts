export const siteConfig = {
  siteName: "Mafia Kilty",
  domain: "mafiakilty.co.uk",
  url: "https://mafiakilty.co.uk",
  contactEmail: "info@mafiakilty.co.uk",
  social: {
    instagram: "https://www.instagram.com/mafiakilty",
    telegram: "https://t.me/+o6rnW8xWC4UyZmJk",
  },
  cities: [
    {
      name: "Edinburgh" as const,
      active: true,
      image: "/photos/edinburgh.jpg",
      imageAlt: "Edinburgh — Mafia Kilty event city",
    },
    {
      name: "Glasgow" as const,
      active: true,
      image: "/photos/glasgow.jpg",
      imageAlt: "Glasgow — Mafia Kilty event city",
    },
  ],
  tallyFormUrl: "https://tally.so/r/PLACEHOLDER",
  paymentsEnabled: true,
  paymentProvider: "stripe" as const,
  paymentUrl: "",
} as const;
