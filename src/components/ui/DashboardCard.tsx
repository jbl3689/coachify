import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  subtext?: string;
  statistic?: string;
  Icon?: React.ReactNode;
  className?: string;
}

function DashboardCard({
  title,
  subtext,
  statistic,
  Icon,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("text-left", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6 sm:pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <span className="w-4 h-4 text-muted-foreground">{Icon}</span>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="break-words text-xl font-bold leading-tight sm:text-2xl">
          {statistic}
        </div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
