import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [movie, setDetails] = useState();
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=3df2799b`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        console.log(data);
      });
  });
  return (
    <div>
      Details
      <Container>
        {movie && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="345"
                  image={movie.Poster}
                  alt={movie.Title}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3">{movie.Title}</Typography>
              <Typography variant="subtitle1">{`Year: ${movie.Year}`}</Typography>
              <Typography variant="body1">{movie.Plot}</Typography>
              <List>
                {movie.Actors.split(", ").map((actor, index) => (
                  <ListItem key={index}>{actor}</ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Details;
