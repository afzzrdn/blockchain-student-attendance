type Absensi = {
    nim: string;
    kodeKelas: string;
    waktu: string;
  };
  
  const AbsensiList = ({ absensi }: { absensi: Absensi[] }) => (
    <>
      <h2 className="text-lg font-semibold mt-6 mb-2">Data Absensi:</h2>
      {absensi.length > 0 ? (
        <ul className="list-disc ml-5">
          {absensi.map((item, index) => (
            <li key={index}>
              <strong>{item.nim}</strong> - {item.kodeKelas} - {new Date(item.waktu).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Belum ada absensi tercatat.</p>
      )}
    </>
  );
  
  export default AbsensiList;
  