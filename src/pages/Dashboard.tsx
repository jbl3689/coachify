import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlexBox } from "@/components/ui/Flexbox";

function Dashboard() {
  return (
    <div className="gap-10">
      <DashboardHeader />

      {/* <Card>
        <CardHeader>
          <CardTitle>Club Information</CardTitle>
        </CardHeader>
        <CardContent>Ellerslie Diamonds</CardContent>
      </Card> */}

      {/* <AdminDashboard /> */}
    </div>
  );
}

export default Dashboard;
