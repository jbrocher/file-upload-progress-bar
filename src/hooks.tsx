import { useState, useEffect } from "react";
import axios from "axios";

export const useUploadForm = (url: string, formData: FormData) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded);
      },
    });
    setIsLoading(false);
    setIsSuccess(true);
  };

  return { fetchData, isSuccess, isLoading, progress };
};
