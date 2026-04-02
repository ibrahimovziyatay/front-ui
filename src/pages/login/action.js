import { endpoints } from "@/libs/endpoint";
import axios from "axios";

export async function loginFN(data) {
  try {
    const res = await axios.post(endpoints.login, data, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true, result: res.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Cannot connect with server",
    };
  }
}
