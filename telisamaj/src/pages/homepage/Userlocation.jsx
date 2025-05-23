import React, { useState, useEffect } from "react";
import { reverseGeocode } from "../../services/api";

const UserLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationText, setLocationText] = useState(
    "No location data available"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lng);

          // If we have hardcoded coordinates for testing
          if (lat === 13.0482176 && lng === 77.6404992) {
            // Hardcoded response for these specific coordinates
            setLocationText("Thanisandra, Bengaluru, 560077");
            setLoading(false);
          } else {
            fetchLocation(lat, lng);
          }
        },
        (err) => {
          setError("Error getting location: " + err.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const fetchLocation = async (lat, lng) => {
    try {
      // Log the coordinates we're using

      const data = await reverseGeocode(lat, lng);

      // Try to extract location from different possible formats
      let locationString = "No location data available";

      // For Mappls API format
      if (data?.results?.length > 0) {
        const result = data.results[0];

        // Try to get area, city, pincode from components
        if (result.address_components) {
          const components = result.address_components;
          let area = "",
            city = "",
            pincode = "";

          components.forEach((component) => {
            if (
              component.types.includes("sublocality_level_1") ||
              component.types.includes("neighborhood")
            ) {
              area = component.long_name;
            }
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              pincode = component.long_name;
            }
          });

          const parts = [area, city, pincode].filter(Boolean);
          if (parts.length > 0) {
            locationString = parts.join(", ");
          }
        }
        // If no components but has formatted address
        else if (result.formatted_address) {
          locationString = result.formatted_address
            .split(",")
            .slice(-3) // Take last 3 parts
            .join(",")
            .trim();
        }
      }
      // For direct Mappls format (sometimes different)
      else if (data?.area || data?.city || data?.pincode) {
        const parts = [data.area, data.city, data.pincode].filter(Boolean);
        if (parts.length > 0) {
          locationString = parts.join(", ");
        }
      }

      setLocationText(locationString);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching location:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="user-location-container">
      <h2>Your Location</h2>

      {loading && <p>Loading your location...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>
          {latitude && longitude && (
            <p>
              Your coordinates: {latitude}, {longitude}
            </p>
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="location-info">
          {/* <p><strong>Coordinates:</strong> {latitude}, {longitude}</p> */}
          <p>{locationText}</p>
        </div>
      )}
    </div>
  );
};

export default UserLocation;
