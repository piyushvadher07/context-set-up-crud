import { useContext } from "react";
import { AuthContext } from "../context/RegisterContext";

export const useAuth = () => useContext(AuthContext);