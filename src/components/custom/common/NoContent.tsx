interface NoContentProps {
  message?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function NoContent({
  message,
  title,
  children,
  className,
}: NoContentProps) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden ${className}`}
    >
      <h1 className="text-lg font-semibold">
        {title ? title : "No Content Found"}
      </h1>
      <p className="mx-auto text-sm text-gray-600 text-center">
        {message
          ? message
          : "Sorry, but we couldn't find the content you're looking for."}
      </p>
      {children}
    </div>
  );
}
