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
      className="w-full space-y-4"
    >
      <TabsList className="grid w-full grid-cols-2 sm:w-auto">
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
