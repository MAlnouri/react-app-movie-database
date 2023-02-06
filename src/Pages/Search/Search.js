import { React, useState } from "react";
import axios from "axios";
import Movie from "../../components/Movies/Movie";
import "./Search.css";

import SearchIcon from "@material-ui/icons/Search";
import {
    Button,
    createTheme,
    TextField,
    ThemeProvider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Snackbar,
} from "@material-ui/core";

  
const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState('');
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = snack;

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffffff",
      },
    },
  });

  /* Method handles API data query with search and sort parameters */
  const getMovies = async () => {
    try {
      /* Displays loading animation while data is retrieved */
      setLoading(true);
      /* Performs search with text query and results sorted */
      if (selected !== '' && searchText !== '') {
          const { data } = await axios.get(
              `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_API_KEY}?title=${searchText}&title_type=feature&sort=${selected}`
            );

            /* These useStates perform changes using the data results and length */
            setContent(data.results);
            setResults(`Showing ${data.results.length} Results`);
      }
      /* Performs search with only text query */
      else if (searchText !== '') {
          const { data } = await axios.get(
              `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_API_KEY}?title=${searchText}&title_type=feature`
            );
            setContent(data.results);
            setResults(`Showing ${data.results.length} Results`);
      } else {
          setSnack({ ...snack, open: true });
          console.log('API error');
      }

      /* Removes loading animation when retrieval is completed */
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          {/* TextField handles input search query and button begins data retrieval */}
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={getMovies}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        {/* Form contains sorting select options and handles choice selection */}
        <FormControl className="form-control">
          <InputLabel>Sort By</InputLabel>
          <Select
              labelId="select"
              id="select-sort"
              className="select-sort"
              value={selected}
              onChange={(v)=>setSelected(v.target.value)}
          >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'alpha,asc'}>Title</MenuItem>
              <MenuItem value={'moviemeter,asc'}>Popularity</MenuItem>
              <MenuItem value={'user_rating,desc'}>Rating</MenuItem>
              <MenuItem value={'release_date,desc'}>Release Date</MenuItem>
          </Select>
        </FormControl>

        {/* Displays number of results */}
        <h2 className="num-results">{results}</h2>

        {/* Displays movies with title, release date rating and cover image */}
        <div className="results">
        {content &&
          content.map((c) => (
            <Movie
              key={c.id}
              id={c.id}
              image={c.image}
              title={c.title}
              description={c.description}
              rating={c.rating}
            />
          ))}
        {searchText &&
          !content &&
          (<h2>No Movies Found</h2>)}
      </div>

        {/* Displays loading line during data retrieval */}
        {loading && <LinearProgress color="secondary" className="load-line"/>}
        {/* Displays error message popup */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
          message="Error Retrieving Data"
          key={vertical + horizontal}
        />
      </ThemeProvider>
    </div>
  );
};
  
export default Search;