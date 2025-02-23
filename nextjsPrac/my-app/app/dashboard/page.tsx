import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const user = await getServerSession();
  return <>{JSON.stringify(user)}</>;
}
