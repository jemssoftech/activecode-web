"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "glow";

interface ButtonProps {
  name: string;
  path?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showArrow?: boolean;
  arrowType?: "right" | "diagonal";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  external?: boolean;
  as?: "link" | "a" | "button" | "div";
  // Legacy support
  bg?: boolean;
  border?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  path = "",
  size = "lg",
  variant,
  icon,
  iconPosition = "right",
  showArrow = true,
  arrowType = "right",
  fullWidth = false,
  className = "",
  disabled = false,
  external = false,
  as = "link",
  bg,
  border,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Legacy support
  const getVariant = (): ButtonVariant => {
    if (variant) return variant;
    if (bg) return "primary";
    if (border) return "outline";
    return "ghost";
  };

  const currentVariant = getVariant();

  // Size configurations
  // const sizeConfig: Record<ButtonSize, { padding: string; text: string; iconSize: string }> = {
  //   sm: { padding: "py-2.5 px-5", text: "text-sm", iconSize: "w-4 h-4" },
  //   md: { padding: "py-3.5 px-7", text: "text-base", iconSize: "w-4 h-4" },
  //   lg: { padding: "py-4 px-9", text: "text-lg", iconSize: "w-5 h-5" },
  //   xl: { padding: "py-5 px-11", text: "text-xl", iconSize: "w-5 h-5" },
  // };
  const sizeConfig: Record<
    ButtonSize,
    { padding: string; text: string; iconSize: string }
  > = {
    sm: {
      padding: "py-2 px-4 sm:py-2.5 sm:px-5",
      text: "text-xs sm:text-sm",
      iconSize: "w-3 h-3 sm:w-4 sm:h-4",
    },
    md: {
      padding: "py-2.5 px-5 sm:py-3 sm:px-6 md:py-3.5 md:px-7",
      text: "text-sm sm:text-base",
      iconSize: "w-4 h-4",
    },
    lg: {
      padding: "py-3 px-6 sm:py-3.5 sm:px-7 md:py-4 md:px-9",
      text: "text-base sm:text-lg",
      iconSize: "w-4 h-4 md:w-5 md:h-5",
    },
    xl: {
      padding: "py-3.5 px-7 sm:py-4 sm:px-9 md:py-5 md:px-11",
      text: "text-lg sm:text-xl",
      iconSize: "w-5 h-5",
    },
  };

  // Variant styles
  const variantStyles: Record<
    ButtonVariant,
    {
      base: string;
      hover: string;
      textColor: string;
      hoverTextColor: string;
    }
  > = {
    primary: {
      base: "bg-secondary border-2 border-secondary",
      hover: "hover:bg-transparent",
      textColor: "text-black",
      hoverTextColor: "group-hover:text-black",
    },
    secondary: {
      base: "bg-white/10 border-2 border-white/20 backdrop-blur-sm",
      hover: "hover:bg-white hover:border-white",
      textColor: "text-black",
      hoverTextColor: "group-hover:text-black",
    },
    outline: {
      base: "bg-transparent border-2 border-secondary",
      hover: "hover:bg-secondary",
      textColor: "text-secondary",
      hoverTextColor: "group-hover:text-white",
    },
    ghost: {
      base: "bg-transparent border-2 border-transparent",
      hover: "hover:bg-white/10 hover:border-white/10",
      textColor: "text-black",
      hoverTextColor: "",
    },
    gradient: {
      base: "bg-gradient-to-r from-primary to-purple-500 border-0",
      hover: "hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
      textColor: "text-white",
      hoverTextColor: "",
    },
    glow: {
      base: "bg-secondary border-0",
      hover: "hover:shadow-[0_0_30px_rgba(var(--secondary-rgb),0.5)]",
      textColor: "text-white",
      hoverTextColor: "",
    },
  };

  const currentStyle = variantStyles[currentVariant];
  const currentSize = sizeConfig[size];

  // Arrow Icon
  const ArrowIcon =
    arrowType === "diagonal" ? ArrowUpRightIcon : ArrowRightIcon;

  const IconElement =
    icon ||
    (showArrow && (
      <ArrowIcon
        className={`
        ${currentSize.iconSize}
        transition-all duration-300
        ${
          arrowType === "diagonal"
            ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-1"
        }
        ${currentStyle.hoverTextColor}
      `}
      />
    ));

  // Disabled state
  if (disabled) {
    return (
      <span
        className={`
          ${currentSize.padding}
          ${currentSize.text}
          ${fullWidth ? "w-full" : ""}
          inline-flex items-center justify-center gap-3
          font-medium rounded-full
          bg-white/5 text-white/30 
          border-2 border-white/10
          cursor-not-allowed
          ${className}
        `}
      >
        {iconPosition === "left" && IconElement}
        <span>{name}</span>
        {iconPosition === "right" && IconElement}
      </span>
    );
  }

  const buttonContent = (
    <>
      {/* Magnetic effect container */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-3"
        animate={{
          x: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {iconPosition === "left" && IconElement}
        <span
          className={`font-medium ${currentStyle.hoverTextColor} transition-colors duration-300`}
        >
          {name}
        </span>
        {iconPosition === "right" && IconElement}
      </motion.span>

      {/* Ripple effect for primary/outline */}
      {(currentVariant === "primary" || currentVariant === "outline") && (
        <span
          className={`
            absolute inset-0 rounded-full
            bg-white opacity-0 group-hover:opacity-100
            scale-0 group-hover:scale-100
            transition-all duration-500 ease-out
            -z-[1]
          `}
        />
      )}

      {/* Shine effect */}
      <span
        className="
          absolute inset-0 rounded-full overflow-hidden
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
          before:-translate-x-full before:skew-x-12
          group-hover:before:translate-x-full
          before:transition-transform before:duration-700 before:ease-out
          -z-[1]
        "
      />

      {/* Border glow for glow variant */}
      {currentVariant === "glow" && (
        <span
          className="
            absolute -inset-[2px] rounded-full
            bg-gradient-to-r from-primary via-purple-500 to-secondary
            opacity-0 group-hover:opacity-100
            blur-md transition-opacity duration-300
            -z-20
          "
        />
      )}
    </>
  );

  const commonClasses = `
    ${currentSize.padding}
    ${currentSize.text}
    ${currentStyle.base}
    ${currentStyle.hover}
    ${currentStyle.textColor}
    ${fullWidth ? "w-full" : ""}
    relative overflow-hidden
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-300 ease-out
    group
    ${className}
  `;

  if (as === "div") {
    return (
      <div
        className={commonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {buttonContent}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link
      href={path}
      className={commonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {buttonContent}
    </Link>
  );
};

export default Button;
