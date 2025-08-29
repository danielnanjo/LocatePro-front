import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    if (!window.Tawk_API) {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/68a924307d18e21931dd2518/1j3abao74';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
    }
  }, []);
  return null;
}