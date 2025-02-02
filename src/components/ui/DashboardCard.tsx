import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

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
    <Card className="text-left">
      <CardHeader
        className={
          "flex flex-row items-center justify-between pb-2 space-y-0" +
          className
        }
      >
        <CardTitle className="text-sm">{title}</CardTitle>
        <span className="w-4 h-4 text-muted-foreground">{Icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{statistic}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
