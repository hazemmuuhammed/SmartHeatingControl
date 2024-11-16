// Function to manage the timeout for manual changes
export const manageTimeout = (
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  setIsManual: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    setIsManual(false);
    timeoutRef.current = null;
  }, 10000);
};
