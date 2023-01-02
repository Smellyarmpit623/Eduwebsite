import YouTube from 'react-youtube';
import React from 'react';


export const YTPlayer = ({ videoId, opts }) =>{
    return(

        <YouTube videoId={videoId} opts={{opts}} />
    )

}

