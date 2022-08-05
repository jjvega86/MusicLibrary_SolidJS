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

export const postSong = async (data, refetch) => {
  try {
    await axios.post("http://localhost:9001/api/songs", data);
    await refetch();
  } catch (error) {
    console.log(error);
  }
};
