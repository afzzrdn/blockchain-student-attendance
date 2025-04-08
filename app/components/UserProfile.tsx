type User = {
    email: string;
    nama: string;
    nim: string;
    fakultas: string;
    jurusan: string;
  };
  
  const UserProfile = ({ user }: { user: User }) => (
    <div className="mb-4">
      <p><strong>Nama:</strong> {user.nama}</p>
      <p><strong>NIM:</strong> {user.nim}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Fakultas:</strong> {user.fakultas}</p>
      <p><strong>Jurusan:</strong> {user.jurusan}</p>
    </div>
  );
  
  export default UserProfile;
  