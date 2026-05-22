import { useEffect } from 'react';
import { useLocation } from 'react-router';
import QRCode from 'react-qr-code';

function DisplayQR() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const dataParam = searchParams.get("data");
  const fg = searchParams.get("fg");
  const bg = searchParams.get("bg");

  useEffect(() => {
    document.title = "Shared QR Code | QURCode";

    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.content = "noindex, nofollow";

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${window.location.origin}/`;
  }, []);

  if (!dataParam) {
    return <>No data to display</>;
  }

  return (
    <section className="bg-custom-white p-4 rounded-lg" aria-label="Shared QR code">
      <h1 className="sr-only">Shared QR Code</h1>
      <QRCode value={dataParam} fgColor={fg || 'black'} bgColor={bg || 'transparent'} />
    </section>
  )
}

export default DisplayQR;
