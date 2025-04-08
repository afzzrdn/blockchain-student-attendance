import { ethers } from "ethers";
import { contractABI, contractAddress } from "./abi";

export async function logAbsensi(nim: string, kodeKelas: string, nama: string, waktu: string) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = provider.getSigner(0); // akun pertama dari Hardhat atau Ganache
  const contract = new ethers.Contract(contractAddress, contractABI, await signer);

  try {
    const tx = await contract.logAbsensi(nim, kodeKelas, nama, waktu);
    await tx.wait(); // Tunggu transaksi berhasil
    console.log("Absensi berhasil dicatat di blockchain");
  } catch (error) {
    console.error("Gagal mencatat absensi ke blockchain:", error);
    throw error;
  }
}

