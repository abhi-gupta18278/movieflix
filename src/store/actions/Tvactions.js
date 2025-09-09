import { loadTv } from "../reducers/tvSlice";
export { removeTv } from "../reducers/tvSlice";
import axiosapi from "../../utils/axiosapi";

export const asyncloadtv = (id) => async (dispatch) => {
  try {
    const detail = await axiosapi.get(`/tv/${id}`);

    const externalid = await axiosapi.get(`/tv/${id}/external_ids`);
    const recommendations = await axiosapi.get(`/tv/${id}/recommendations`);
    const similar = await axiosapi.get(`/tv/${id}/similar`);
    const videos = await axiosapi.get(`/tv/${id}/videos`);
   

    const watchproviders = await axiosapi.get(`/tv/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((e) => e.type == "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    
    };
    dispatch(loadTv(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log("Error: ", error);
  }
};
