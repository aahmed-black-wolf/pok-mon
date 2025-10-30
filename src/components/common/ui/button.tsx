import { cn } from "@/src/utils/cn/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "bordered" | "flat" | "faded" | "shadow" | "light";
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isDisabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      color = "primary",
      isDisabled = false,
      isLoading = false,
      fullWidth = false,
      startContent,
      endContent,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const colorStyles = {
      default: {
        solid: "bg-button-bg text-button-text hover:bg-button-bg-hover",
        bordered:
          "border-2 border-button-bg text-button-bg hover:bg-button-bg/10",
        flat: "bg-button-bg/20 text-button-bg hover:bg-button-bg/30",
        faded: "bg-button-bg/10 text-button-bg hover:bg-button-bg/20",
        shadow:
          "bg-button-bg shadow-lg hover:shadow-xl hover:bg-button-bg-hover text-button-text",
        light: "text-button-bg hover:bg-button-bg/20",
      },
      primary: {
        solid: "bg-accent text-white hover:bg-accent/90",
        bordered: "border-2 border-accent text-accent hover:bg-accent/10",
        flat: "bg-accent/20 text-accent hover:bg-accent/30",
        faded: "bg-accent/10 text-accent hover:bg-accent/20",
        shadow:
          "bg-accent shadow-lg hover:shadow-xl hover:bg-accent/90 text-white",
        light: "text-accent hover:bg-accent/20",
      },
      secondary: {
        solid: "bg-xp text-white hover:bg-xp/90",
        bordered: "border-2 border-xp text-xp hover:bg-xp/10",
        flat: "bg-xp/20 text-xp hover:bg-xp/30",
        faded: "bg-xp/10 text-xp hover:bg-xp/20",
        shadow: "bg-xp shadow-lg hover:shadow-xl hover:bg-xp/90 text-white",
        light: "text-xp hover:bg-xp/20",
      },
      success: {
        solid: "bg-green-500 text-white hover:bg-green-600",
        bordered:
          "border-2 border-green-500 text-green-600 hover:bg-green-500/10",
        flat: "bg-green-500/20 text-green-600 hover:bg-green-500/30",
        faded: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
        shadow:
          "bg-green-500 shadow-lg hover:shadow-xl hover:bg-green-600 text-white",
        light: "text-green-600 hover:bg-green-500/20",
      },
      warning: {
        solid: "bg-yellow-500 text-white hover:bg-yellow-600",
        bordered:
          "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500/10",
        flat: "bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30",
        faded: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
        shadow:
          "bg-yellow-500 shadow-lg hover:shadow-xl hover:bg-yellow-600 text-white",
        light: "text-yellow-600 hover:bg-yellow-500/20",
      },
      danger: {
        solid: "bg-fire text-white hover:bg-fire/90",
        bordered: "border-2 border-fire text-fire hover:bg-fire/10",
        flat: "bg-fire/20 text-fire hover:bg-fire/30",
        faded: "bg-fire/10 text-fire hover:bg-fire/20",
        shadow: "bg-fire shadow-lg hover:shadow-xl hover:bg-fire/90 text-white",
        light: "text-fire hover:bg-fire/20",
      },
    };

    const baseStyles =
      "inline-flex items-center cursor-pointer justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = colorStyles[color][variant];
    const sizeStyle = sizeStyles[size];

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyle,
          variantStyles,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {startContent && !isLoading && <span>{startContent}</span>}
        {children}
        {endContent && <span>{endContent}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
