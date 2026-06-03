interface SubHeadingProps {
  children: React.ReactNode;
}

export function SubHeading({ children }: SubHeadingProps) {
  return (
    <p className="mt-1 text-sm text-slate-500 tracking-tight mt-5 mb-10">
      {children}
    </p>
  );
}
