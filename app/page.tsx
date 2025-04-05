import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen p-5 overflow-hidden relative bg-black">
      <h1 className="text-6xl text-white font-bold">PresentChain</h1>
      <button className="bg-blue-600 px-5 py-1 text-white font-bold rounded-lg absolute right-5 top-5">
        Login
      </button>
      <Image
        src="/alya-1.png"
        alt="alya"
        width={400}
        height={100}
        className="absolute -right-10 bottom-0"
      />
    </div>
  );
}
