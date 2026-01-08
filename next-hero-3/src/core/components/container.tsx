import { cn } from "@heroui/react";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string | Record<string, boolean>;
}

export function Container(props: ContainerProps) {
  return <section className={cn("mx-auto px-4 md:max-w-5xl", props.className)}>{props.children}</section>;
}
