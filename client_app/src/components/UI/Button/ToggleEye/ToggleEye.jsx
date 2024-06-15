import React, { useState } from 'react';
import Eye from '../../Icon/ButtonEye/Eye';
import EyeSlash from '../../Icon/ButtonEye/EyeSlash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ToggleEye(estado_leido) {
  const [isEye, setIsEye] = useState(estado_leido);

  const handleClick = () => {
    setIsEye(!isEye);
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{isEye ? 'No leído' : 'Leído'}</Tooltip>}
    >
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {isEye ? <Eye /> : <EyeSlash />}
      </div>
    </OverlayTrigger>
  );
}