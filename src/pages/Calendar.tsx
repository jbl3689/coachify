import { useUserTeams } from "@/hooks/teams/useUserTeams";
import CalendarWeek from "../components/Calendar/CalendarWeek";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Calendar() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigate = useNavigate();
  const { teams } = useUserTeams();

  useEffect(() => {
    setIsAlertOpen(true);
  }, []);

  if (!teams || teams.length === 0) {
    return (
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You have no team selected. Please select one in the dashboard.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/")}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <CalendarWeek />;
}

export default Calendar;
