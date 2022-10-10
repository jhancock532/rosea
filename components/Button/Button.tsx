import Link from "next/link";
import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "custom" | "green" | "red" | "blue";
  hue?: number;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  internalLink?: boolean;
  url?: string;
};

export const Button = ({
  children,
  className,
  type,
  variant,
  hue,
  onClick,
  internalLink,
  url,
}: ButtonProps) => {
  const classNames = className
    ? `${styles.button} ${className}`
    : styles.button;

  let hueValue = 0;
  switch (variant) {
    case "default":
      break;
    case "custom":
      hueValue = hue || 0;
      break;
    case "red":
      hueValue = 0;
      break;
    case "green":
      hueValue = 120;
      break;
    case "blue":
      hueValue = 240;
      break;
    default:
      hueValue = 120;
  }

  const buttonStyle = {
    color: "white",
    backgroundColor: `hsl(0, 0, 40%)`,
  };

  if (variant !== "default") {
    buttonStyle.backgroundColor = `hsl(${hueValue}, 100%, 27%)`;
  }

  if (url) {
    if (internalLink) {
      return (
        <Link href={url} className={classNames} style={buttonStyle}>
          {children}
        </Link>
      );
    }

    return (
      <a href={url} className={classNames} style={buttonStyle}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      className={classNames}
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};
