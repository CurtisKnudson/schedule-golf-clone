export const ArrowRightIcon = (props: { className?: string }) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : 'h-w-6'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};
