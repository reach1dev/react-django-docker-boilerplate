import React from "react";

export default function ({ size = 'small' }) {

  return (
    <span style={{ height: 'fit-content', marginTop: 'auto', marginBottom: 'auto' }}>
      <img src="/logo.png" width={size === 'large' ? '250px' : '100px'} />
    </span>
  )
}