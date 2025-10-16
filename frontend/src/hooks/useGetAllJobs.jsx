import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../store/slices/jobSlice";
import { GET_ALL_JOBS } from "../utils/constant";
import { toast } from "react-hot-toast";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.get(`${GET_ALL_JOBS}/`, {
          withCredentials: true,
        });

        dispatch(setAllJobs(data.jobs));
      } catch (error) {
        toast.error("Failed to fetch jobs");
        console.error("Fetch Jobs Error:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
