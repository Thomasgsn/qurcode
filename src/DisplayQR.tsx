import { useLocation } from 'react-router';
import QRCode from 'react-qr-code';

function DisplayQR() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const dataParam = searchParams.get("data");
  const fg = searchParams.get("fg");
  const bg = searchParams.get("bg");

  if (!dataParam) {
    return <>No data to display</>;
  }

  let data;
  try {
    data = decodeURIComponent(dataParam);
  } catch (error) {
    return <>Invalid data format</>;
  }

  return <QRCode value={data} fgColor={fg || 'black'} bgColor={bg || 'transparent'} />
}

export default DisplayQR;
