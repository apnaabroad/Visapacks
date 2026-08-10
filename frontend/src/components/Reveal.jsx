import { useScrollReveal } from "../hooks/useScrollReveal.js";

// Wraps children in a fade-in + slide-up-on-scroll effect (see .reveal in
// index.css). `delay` (ms) staggers items in a list - pass e.g. index * 60.
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, ...rest }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
