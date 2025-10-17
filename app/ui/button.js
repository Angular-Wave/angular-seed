/** @typedef {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'} VariantType */
/** @typedef {'default' | 'sm' | 'lg' | 'icon'} SizeType */

/**
 * Button schema defining available variants and sizes
 * @type {{
 *   variants: {
 *     variant: Record<VariantType, string>,
 *     size: Record<SizeType, string>
 *   },
 *   defaultVariants: { variant: VariantType, size: SizeType }
 * }}
 */
const schema = {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 gap-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
};

/**
 * Base classes applied to all buttons
 * @type {string}
 */
const baseline =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

/**
 * Get the resolved variant or size classes from schema
 * @param {'variant' | 'size'} type
 * @param {string | null} attr
 * @returns {string}
 */
function getVariantClass(type, attr) {
  const value = attr?.toLowerCase();
  return (
    schema.variants[type][value] ||
    schema.variants[type][schema.defaultVariants[type]]
  );
}

/**
 * Compute final classes for a button element
 * @param {HTMLButtonElement} el
 * @returns {string}
 */
function computeClasses(el) {
  const variantAttr = el.getAttribute("variant");
  const sizeAttr = el.getAttribute("size");
  const customClasses = el.getAttribute("class");

  return [
    baseline,
    getVariantClass("variant", variantAttr),
    getVariantClass("size", sizeAttr),
    customClasses || "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Adds classes to the element based on variant, size, and existing classes
 * @returns {{restrict: string, compile: (el: HTMLButtonElement) => void}}
 */
export function buttonDirective() {
  return {
    restrict: "E",
    compile(el) {
      // Apply initial classes
      el.className = computeClasses(el);
    },
  };
}
