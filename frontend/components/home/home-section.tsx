"use client";
import StatsCards from "./stats-cards";
import FilterSection from "./filter-section";
import ComplaintTable from "./complaint-table";
import useSWR from "swr";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";
import { ComplaintResponse } from "@/types";

const HomeSection = () => {
  const { data: response, isLoading, mutate } = useSWR<ComplaintResponse>(`${apiBaseUrl}/complaints`, fetcher);

  const complaints = response?.data ?? [];
  return (
    <section className="pt-24 pb-8">
      <div className="px-[3%] container mx-auto">
        {/* Card */}
        <StatsCards />

        {/* filter */}
        <FilterSection />

        {/* daftar keluhan */}
        <ComplaintTable complaints={complaints} isLoading={isLoading} mutate={mutate} />
      </div>
    </section>
  );
};

export default HomeSection;
