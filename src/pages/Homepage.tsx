import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Calendar from "./Calendar";
import Dashboard from "./Dashboard";

function Homepage() {
  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>

      <TabsContent value="calendar">
        <Calendar />
      </TabsContent>

      <TabsContent value="dashboard" className="space-y-4">
        <Dashboard />
      </TabsContent>
    </Tabs>
  );
}

export default Homepage;
