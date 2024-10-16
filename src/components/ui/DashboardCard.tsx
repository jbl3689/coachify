import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

interface DashboardCardProps {
  Title?: React.ReactNode;
  Description?: React.ReactNode;
  children?: React.ReactNode;
  Footer?: React.ReactNode;
  className?: string;
}

function DashboardCard({
  Title,
  Description,
  children,
  Footer,
  className,
}: DashboardCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl text-amber-300">{Title}</CardTitle>
        <CardDescription>{Description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  );
}

export default DashboardCard;
