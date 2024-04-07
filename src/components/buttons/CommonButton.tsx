import React from 'react';
import { Button } from '@mui/material';
import './CommonButton.scss';

type CommonButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  iconUrl?: string;
  label?: string;
  classes?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export const CommonButton = ({
  variant,
  size,
  iconUrl,
  label,
  classes,
}: CommonButtonProps): JSX.Element => {
  return (
    <Button
      variant={variant || 'outlined'}
      size={size || 'medium'}
      startIcon={
        iconUrl && (
          <img src={iconUrl}
            className='icon'
            alt='icon'
          />
        )
      }
      className={`common-button ${classes && classes}`}
    >
      {(label && <p>{label}</p>) || <></>}
    </Button>
  );
};
