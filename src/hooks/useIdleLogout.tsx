import { useEffect } from "react";
import { useIdle } from "@uidotdev/usehooks";
import { toast } from "sonner";

const useIdleLogout = (logoutTime = 30 * 60 * 1000) => {
  const idle = useIdle(logoutTime);

  useEffect(() => {
    if (idle) {
      toast.warning("Idle Logout");
      const timeoutId = setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 2 * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [idle]);

  return idle;
};

export default useIdleLogout;
