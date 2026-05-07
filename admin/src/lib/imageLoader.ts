
type LoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

const GlobalImageLoader = ({ src, width, quality }: LoaderParams): string => {
  // Add ?w=...&q=... only if not already present
  const hasQuery = src.includes("?");
  const separator = hasQuery ? "&" : "?";

  return `${src}${separator}w=${width}&q=${quality || 75}`;
};

export default GlobalImageLoader;
