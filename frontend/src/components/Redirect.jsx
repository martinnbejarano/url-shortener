/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axi } from "../api/useAxios";

export const Redirect = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUrl = async () => {
      try {
        const response = await axi.get(`/s/${slug}`);
        const url = response.data.original_url;
        window.location.href = url;
      } catch (e) {
        navigate("/");
      }
    };

    getUrl();
  }, [slug, navigate]);

  return <h1>Loading ...</h1>;
};
