import axiosapi from "../../utils/axiosapi";
import { loadPerson } from "../reducers/people";
export { removePerson } from "../reducers/people";

export const asyncloadPerson = (id) => async (dispatch) => {
  try {
    const detail = await axiosapi.get(`/person/${id}`);
    const externalid = await axiosapi.get(`/person/${id}/external_ids`);
    const combinedCredits = await axiosapi.get(`/person/${id}/combined_credits`);
    const tvCredits = await axiosapi.get(`/person/${id}/tv_credits`);
    const movieCredits = await axiosapi.get(`/person/${id}/movie_credits`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    dispatch(loadPerson(theultimatedetails));
  } catch (err) {
    console.log(err);
  }
};
