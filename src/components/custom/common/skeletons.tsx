import { Skeleton } from "@/components/ui/skeleton";

export function ExploreGridSkeleton() {
  return (
    <div className="w-full h-[90vh] grid grid-cols-2 gap-6">
      {Array.from([1, 2, 3, 4, 5, 6]).map((item) => (
        <Skeleton key={item} className="w-full aspect-[9/14] rounded-xl" />
      ))}
    </div>
  );
}
