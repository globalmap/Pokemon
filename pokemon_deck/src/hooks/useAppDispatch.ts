import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/types/store.types";

export const useAppDispatch: () => AppDispatch = useDispatch;