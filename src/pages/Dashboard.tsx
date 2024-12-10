import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import PlayerDashboard from "@/components/PlayerDashboard.tsx/PlayerDashboard";
import { useIsUserAdmin } from "@/hooks/user/useIsUserAdmin";

function Dashboard() {
  const isUserAdmin = useIsUserAdmin();

  return (
    <div className="gap-10">
      {isUserAdmin ? <AdminDashboard /> : <PlayerDashboard />}
    </div>
  );
}

export default Dashboard;
