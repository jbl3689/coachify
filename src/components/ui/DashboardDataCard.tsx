import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface DashboardCardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

function DashboardDataCard({ title, children, className }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader
        className={
          "flex flex-row items-center justify-between pb-2 space-y-0" +
          className
        }
      >
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default DashboardDataCard;
