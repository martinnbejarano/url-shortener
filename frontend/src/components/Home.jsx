import { CreateUrlCard } from "./CreateUrlCard";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { getUrls } from "../api/urls";
import { UrlCard } from "./UrlCard";
import { useUrlsStore } from "../store/urls";

export const Home = () => {
  const { isAuth } = useAuthStore();
  const { urls, setUrls } = useUrlsStore();

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
  }, [isAuth, setUrls]);

  return (
    <main className="grid justify-center p-10 sm:grid-cols-1 md:grid-cols-[1.5fr,2.5fr]">
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
