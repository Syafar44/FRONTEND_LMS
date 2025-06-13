"use client";
import authServices from "@/services/auth.service";
import { useState } from "react";


export function useFileHandling() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Tidak ada file yang dipilih.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await authServices.uploadFileRegister(file);
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat upload");
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    loading,
    error,
    response,
    handleFileChange,
    uploadFile,
  };
}
