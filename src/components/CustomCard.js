import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function CustomCard({ media, isFavourite, handleToggle, handleClick }) {
  return (
    <div>
      {media && (
        <div>
          <Card elevation={1} sx={{ maxWidth: 345 }} className="card">
            <CardMedia component="img" image={media.Poster} alt={media.Title} onClick={() => handleClick(media)}/>
            <Typography gutterBottom variant="h5" component="h2">
              {media.Title}
            </Typography>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites"                     onClick={() => handleToggle(media)}
>
                {isFavourite ? (
                  <FavoriteIcon
                    color="secondary"
                  />
                ) : (
                  <FavoriteBorderIcon
                    color="secondary"
                  />
                )}
                {/* {!fav ? (
            favourite ? (
              <FavoriteIcon
                color="secondary"
                onClick={() => handleToggle(media)}
              />
            ) : (
              <FavoriteBorderIcon
                color="secondary"
                onClick={() => handleToggle(media)}
              />
            )
          ) : null} */}
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CustomCard;
