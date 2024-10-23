import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import PlayerDashboard from "@/components/PlayerDashboard.tsx/PlayerDashboard";
import { getCurrentReduxUser } from "@/context/userSlice";

import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";
import { useSelector } from "react-redux";

function Dashboard() {
  const { id } = useSelector(getCurrentReduxUser());
  const { admins } = useTeamAdmins();

  const isUserAdmin = admins?.some((admin) => admin.id === id);

  return (
    <div className="gap-10">
      {isUserAdmin ? <AdminDashboard /> : <PlayerDashboard />}

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
