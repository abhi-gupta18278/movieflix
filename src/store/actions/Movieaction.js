export { removeMovie } from "../reducers/movieSlice";
import { loadMovie } from "../reducers/movieSlice";
import axiosapi from "../../utils/axiosapi.js";

export const asyncloadmovie = (id) => async (dispatch) => {
  try {
    const detail = await axiosapi.get(`/movie/${id}`);

    const externalid = await axiosapi.get(`/movie/${id}/external_ids`);
    const recommendations = await axiosapi.get(`/movie/${id}/recommendations`);
    const similar = await axiosapi.get(`/movie/${id}/similar`);
    const videos = await axiosapi.get(`/movie/${id}/videos`);
    const watchproviders = await axiosapi.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((e) => e.type == "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadMovie(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log("Error: ", error);
  }
};
