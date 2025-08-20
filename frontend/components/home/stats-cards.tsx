import { apiBaseUrl } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import { StatsResponse } from "@/types";

const StatsCards = () => {
  const { data } = useSWR<StatsResponse>(`${apiBaseUrl}/complaints/stats`, fetcher);

  const complaintDataStatus = data?.data;

  const stats = [
    { title: "Total Keluhan", color: "text-black", value: complaintDataStatus?.totalCompliment },
    { title: "Menunggu", color: "text-yellow-500", value: complaintDataStatus?.totalWaiting },
    { title: "Sedang Ditangani", color: "text-blue-500", value: complaintDataStatus?.totalInProgress },
    { title: "Selesai", color: "text-green-500", value: complaintDataStatus?.totalDone },
  ];
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="w-full">
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl ${stat.color} font-bold`}>{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
