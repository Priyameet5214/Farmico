import React from "react";
import PropTypes from "prop-types";

const shapes = {
  RoundedBorder20: "rounded-[20px]",
  RoundedBorder10: "rounded-[10px]",
  RoundedBorder24: "rounded-[24px]",
};
const variants = {
  FillLightgreen100: "bg-light_green_100 text-black_900",
  FillGreen500: "bg-green_500 text-black_900",
};
const sizes = { sm: "p-1.5", md: "p-[11px]", lg: "p-[19px]" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf([
    "RoundedBorder20",
    "RoundedBorder10",
    "RoundedBorder24",
  ]),
  variant: PropTypes.oneOf(["FillLightgreen100", "FillGreen500"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

Button.defaultProps = { className: "", shape: "", variant: "", size: "" };
export { Button };
