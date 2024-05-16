export default function Button({ children, text, className, ...props }) {
  let cssClass = text ? "text-button" : "button";
  cssClass += " " + className;

  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
}
