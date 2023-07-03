import { useContext } from "react";
import { SearchContext } from "../contexts";

export const useSearch = () => useContext(SearchContext);
