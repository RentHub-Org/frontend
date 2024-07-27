import { IconSausage, IconUserBolt, IconBrandTelegram, IconFile } from "@tabler/icons-react";

export const links = [
    {
      label: "Uploads",
      href: "/app/upload",
      icon: (
        <IconFile className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/app/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Usage",
      href: "/app/usage",
      icon: (
        <IconSausage  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Telegram",
      href: "/app/telegram",
      icon: (
        <IconBrandTelegram  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];