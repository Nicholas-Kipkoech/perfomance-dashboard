import axios, { AxiosResponse } from "axios";

interface ErrorResponse {
  isError: boolean;
  message: string;
}

export const dataFetcher = async (
  endpoint: string,
  headers: Record<string, string>
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `http://localhost:5002/bima/perfomance/${endpoint}`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error("Errror", error);
    return {
      isError: true,
      message: "Server error",
    };
  }
};
