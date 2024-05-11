import getUser from "@/lib/auth/getUser";
import capitalize from "capitalize";



export default async function Home() {
  const { user } = await getUser();

  if (!user) return <main>
    <p className="text-4xl uppercase text-white tracking-wider leading-snug">You are not authenticated.</p>
  </main>

  return (
    <main className="flex-1 p-4 flex flex-col justify-center items-center">
      <div className="card p-6 bg-white max-w-md w-full rounded space-y-1 text-sm">
        <p>Hello There, <b>{capitalize(user.name.split(' ')[0])}</b></p>
        <p>Your Email Address is <b>{user.email}</b></p>
      </div>
    </main>
  );
}
