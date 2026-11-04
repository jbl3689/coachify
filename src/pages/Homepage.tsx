import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calendar from "./Calendar";
import Dashboard from "./Dashboard";

function Homepage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-6"
    >
      <TabsList className="flex w-full justify-start">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>

      <TabsContent value="calendar">
        <Calendar />
      </TabsContent>

      <TabsContent value="dashboard" className="space-y-4">
        <Dashboard onShowCalendar={() => setActiveTab("calendar")} />
      </TabsContent>
    </Tabs>
  );
}

export default Homepage;
