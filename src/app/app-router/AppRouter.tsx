import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {usePrefetch} from "@entities/geocode/model";

const Home = lazy(async () => {
  return await import("@pages/home/ui/index.ts");
});


export const AppRouter = () => {
  usePrefetch();

  return <Routes>
    <Route path="" element={<Home/>} index/>
  </Routes>
}