import React, { useState } from "react";

function Controls({ onAssetChange }) {
  const [asset, setAsset] = useState('R_100');

  const handleAssetChange = (newAsset) => {
    setAsset(newAsset);
    onAssetChange(newAsset);
  };

  return (
    <div className="controls-container">
      <div className="asset-selector">
        <label>Asset</label>
        <select value={asset} onChange={(e) => handleAssetChange(e.target.value)}>
          <option value="R_100">R_100</option>
          <option value="R_50">R_50</option>
          {/* Add more assets as needed */}
        </select>
      </div>
      {/* Other controls */}
    </div>
  );
}

export default Controls;
