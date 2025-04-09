import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd-mobile';
import { TeamOutline } from 'antd-mobile-icons';
import '../../styles/featureTiles.css';

const RupeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
  </svg>
);

// Base tile component that can be configured for different features
const TileComponent = ({ 
  title, 
  iconComponent,
  onClick, 
  navigateTo,
  tileClass,
  isVisible = true // Default to visible
}) => {
  const navigate = useNavigate();
  
  // If isVisible is explicitly false, don't render anything
  if (isVisible === false) return null;
  
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <Card
      onClick={handleClick}
      className={`feature-tile ${tileClass}`}
    >
      <div className="feature-tile-content">
        <div className="feature-tile-icon">
          {iconComponent}
        </div>
        <div className="feature-tile-title">{title}</div>
      </div>
    </Card>
  );
};

// Specific components for each feature type
export const BhamasahTile = ({ data, onOpen }) => (
  <TileComponent
    title={data.title || "Donation"}
    iconComponent={<RupeeIcon />}
    onClick={onOpen}
    tileClass="donation-tile"
    isVisible={data.isVisible}
  />
);

export const ProfessionTile = ({ data, onOpen }) => (
  <TileComponent
    title={data.title || "Profession"}
    iconComponent={<TeamOutline fontSize={32} />}
    onClick={onOpen}
    tileClass="profession-tile"
    isVisible={data.isVisible}
  />
);

export const FamilyTile = ({ data, onOpen }) => (
  <TileComponent
    title={data.title || "Family"}
    iconComponent={<TeamOutline fontSize={32} />}
    onClick={onOpen}
    tileClass="family-tile"
    isVisible={data.isVisible}
  />
);

export const AdminListTile = ({ data }) => (
  <TileComponent
    title={data.title || "Admin List"}
    iconComponent={<TeamOutline fontSize={32} />}
    navigateTo={data.navigateTo || "/adminlist"}
    tileClass="admin-list-tile"
    isVisible={data.isVisible}
  />
);

export default {
  BhamasahTile,
  ProfessionTile,
  FamilyTile,
  AdminListTile
};