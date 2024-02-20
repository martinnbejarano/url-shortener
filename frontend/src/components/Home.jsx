import { CardUrl } from "./CardUrl";

export const Home = () => {
  return (
    <main className="flex gap-20 p-10">
      <CardUrl />
      <div className="w-1/3 h-[400px] py-10 mx-auto">
        <h3 className="text-4xl">👋 Welcome</h3>
        <button></button>
      </div>
    </main>
  );
};
