import { APP_LOGO, APP_NAME } from "@/core/lib/env.public";

export function SidebarBrand() {
  return (
    <div className="flex items-center gap-2 p-4">
      <img src={APP_LOGO} alt={APP_NAME} className="size-8 object-contain" />
      <h1 className="text-foreground text-lg font-bold">{APP_NAME}</h1>
    </div>
  );
}
