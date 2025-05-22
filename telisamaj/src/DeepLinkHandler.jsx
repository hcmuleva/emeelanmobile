import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";

const DeepLinkHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let listener;
    let isMounted = true;

    const setupListener = async () => {
      try {
        const newListener = await CapacitorApp.addListener("appUrlOpen", (event) => {
          if (!isMounted) return;
          
          if (event?.url) {
            const url = new URL(event.url);
            const pathname = url.pathname;
            const referralId = url.searchParams.get("referral_id");
            const orgId = url.searchParams.get("orgid");

            console.log("📲 Deep link opened:", event.url);

            if (pathname.includes("/referral") && referralId && orgId) {
              navigate(`/reffereralregistration?referral_id=${referralId}&orgid=${orgId}`);
            }
          }
        });

        if (isMounted) {
          listener = newListener;
        } else {
          newListener.remove();
        }
      } catch (error) {
        console.error("Error setting up deep link listener:", error);
      }
    };

    setupListener();

    return () => {
      isMounted = false;
      if (listener && typeof listener.remove === "function") {
        listener.remove().catch(error => {
          console.error("Error removing listener:", error);
        });
      }
    };
  }, [navigate]);

  return null;
};

export default DeepLinkHandler;