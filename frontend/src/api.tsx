import axios from "axios";
import { CompanySearch } from "./interfaces";
interface SearchResponse {
  data: CompanySearch[];
}
export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
    );
    // console.log("EEEEE", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log("unexpected error", error);
      return "unexpected error";
    }
  }
};
