"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";
import { CategoriesResponse } from "@/types";

const FilterSection = () => {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data: response } = useSWR<CategoriesResponse>(`${apiBaseUrl}/categories`, fetcher);

  const categories = response?.data ?? [];

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    router.replace(`?${params.toString()}`);
  }, [status, category, search, router]);
  return (
    <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4">
      <Button asChild className="bg-violet-500 hover:bg-violet-500/80 cursor-pointer">
        <Link href="/add">Buat Keluhan</Link>
      </Button>
      <Select onValueChange={(value) => setStatus(value)}>
        <SelectTrigger className="dark:bg-darkBlue dark:hover:bg-darkBlue/90 w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white">
          <SelectValue placeholder="Pilih status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Menunggu</SelectItem>
          <SelectItem value="IN_PROGRESS">Sedang Ditangani</SelectItem>
          <SelectItem value="CLOSED">Selesai</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="dark:bg-darkBlue dark:hover:bg-darkBlue/90 w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white">
          <SelectValue placeholder="Pilih kategori" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative">
        <Search size={24} className="absolute top-1/2 -translate-y-1/2 left-2 text-slate-500" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari keluhan..." className="dark:bg-darkBlue pl-9 focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white" />
      </div>
    </div>
  );
};

export default FilterSection;
