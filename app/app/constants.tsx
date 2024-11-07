import { IconSausage, IconUserBolt, IconBrandTelegram, IconFile, IconBucket } from "@tabler/icons-react";
import { LucideKeySquare } from "lucide-react";

export const links = [
    {
      label: "Uploads",
      href: "/app/upload",
      icon: (
        <IconFile className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "S3 Storage",
      href: "/app/s3",
      icon: (
        <IconBucket className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
    {
      label: "Api-keys",
      href: "/app/api",
      icon: (
        <LucideKeySquare  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    
  ];