import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

function DashboardDataCard({ title, children, className }: DashboardCardProps) {
  return (
    <Card className={cn("min-w-0", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default DashboardDataCard;
