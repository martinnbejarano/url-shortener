import { CreateUrlCard } from "./CreateUrlCard";
import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";
import { getUrls } from "../api/urls";
import { UrlCard } from "./UrlCard";

export const Home = () => {
  const [urls, setUrls] = useState();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        if (isAuth) {
          const response = await getUrls();
          setUrls(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUrls();
  }, [isAuth]);

  return (
    <main className="grid justify-center gap-8 p-10 sm:grid-cols-1 sm:justify-center md:grid-cols-[1.5fr,2.5fr]">
      <CreateUrlCard />

      <div className="py-10">
        {isAuth ? (
          <section className="dash">
            {urls?.map((url) => (
              <UrlCard key={url.id} url={url} />
            ))}
          </section>
        ) : (
          <h3 className="text-4xl">👋 Welcome</h3>
        )}
      </div>
    </main>
  );
};
