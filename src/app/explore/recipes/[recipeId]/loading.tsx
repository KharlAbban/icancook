import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-screen p-2 gap-[5vh]">
      <Skeleton className="w-full h-[70vh]" />
      <Skeleton className="w-full h-[20vh]" />
    </div>
  );
}
