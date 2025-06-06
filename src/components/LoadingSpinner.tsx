import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <FaSpinner className="animate-spin text-4xl text-primary" />
    </div>
  );
}
