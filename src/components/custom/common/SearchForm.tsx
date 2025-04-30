import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";

export default async function SearchForm({
  searchQuery,
  placeholder,
  actionUrl,
}: {
  placeholder?: string;
  searchQuery?: string;
  actionUrl: string;
}) {
  return (
    <Form
      action={actionUrl}
      scroll={false}
      className="flex w-full items-center gap-0 border rounded-full"
    >
      <Input
        name="searchQuery"
        type="search"
        placeholder={placeholder || "Find something..."}
        defaultValue={searchQuery}
        className="border-0 outline-none focus:border-0"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="aspect-square h-full rounded-l-none p-2"
      >
        <Search />
      </Button>
    </Form>
  );
}
