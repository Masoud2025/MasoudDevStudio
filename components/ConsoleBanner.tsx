"use client";

import { useEffect } from "react";

export default function ConsoleBanner() {
  useEffect(() => {
    const art = `
      ▄▄▄     ▄▄▄                                   ▄▄▄▄▄▄      ▄▄               
       ███▄ ▄███                              █▄   █▀ ██       ██                
       ██ ▀█▀ ██                              ██      ██      ▄██▄      ▄    ▀▀  
       ██     ██   ▄▀▀█▄ ▄██▀█ ▄███▄ ██ ██ ▄████      ██ ▄▀▀█▄ ██ ▄▀▀█▄ ████▄██  
       ██     ██   ▄█▀██ ▀███▄ ██ ██ ██ ██ ██ ██      ██ ▄█▀██ ██ ▄█▀██ ██   ██  
     ▀██▀     ▀██▄▄▀█▄███▄▄██▀▄▀███▀▄▀██▀█▄█▀███      ██▄▀█▄██▄██▄▀█▄██▄█▀  ▄██  
                                                  ▄   ██       ██                
                                                  ▀████▀      ▀▀                  
    `;

    console.log(
      `%c${art}`,
      `
      color: #00ff00;
      font-size: 16px;
      font-weight: 900;
      font-family: monospace;
      line-height: 1;
      `
    );
  }, []);

  return null;
}
