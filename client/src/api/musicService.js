import axios from "axios";

export const fetchSongs = async (query) => {
  console.log(query);
  try {
    let response = await axios.get(
      `http://localhost:9001/api/songs/?search=${query}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
