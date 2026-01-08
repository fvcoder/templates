import { tv } from "tailwind-variants";

export const table = tv({
  slots: {
    base: "w-full",
    thead: "bg-default-100",
    tbody: "divide-y divide-divider",
    tr: "transition-colors hover:bg-default-50",
    th: "px-6 py-3 text-sm font-semibold text-foreground",
    td: "px-6 py-4",
  },
  variants: {
    align: {
      left: {
        th: "text-left",
      },
      center: {
        th: "text-center",
      },
      right: {
        th: "text-right",
      },
    },
    color: {
      default: {
        td: "text-foreground",
      },
      muted: {
        td: "text-foreground-600",
      },
    },
  },
  defaultVariants: {
    align: "left",
    color: "default",
  },
});
