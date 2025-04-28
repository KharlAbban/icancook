import { vetrinoFont } from "@/app/fonts";

export default function ExploreStaticHeader() {
  return (
    <article className="gap-6 text-sm text-gray-500 py-3 ps-2 w-full">
      <h2 className={`${vetrinoFont.className} mb-2 text-black text-4xl`}>
        Curated <br /> Cooklist
      </h2>
      <p className="mb-1">All recipes here are handcrafted by YOU</p>
      <p>Enjoy them!</p>
    </article>
  );
}
