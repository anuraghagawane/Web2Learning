import axios from "axios";

export default async function Home() {
  const data = await axios.get("http://localhost:3000/api/user");
  console.log(data.data);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {JSON.stringify(data.data)}
    </div>
  );
}
