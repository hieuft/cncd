export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CNCD",
  description: "Web luyện đề thi TSA chất lượng",
  navItems: [
    {
      label: "Mua đề",
      href: "/purchase",
    },
    {
      label: "Tích điểm",
      href: "/pointing",
    },
  ],
  navMenuItems: [
    {
      label: "Mua đề",
      href: "/purchase",
    },
    {
      label: "Vào thi",
      href: "/exam",
    },
  ],

  links: {
    facebookFanpage: "https://www.facebook.com/cncd.tsa/",
    facebookGroup: "https://www.facebook.com/groups/cncd.tsa",
  },
};
