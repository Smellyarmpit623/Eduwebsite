import YouTube from 'react-youtube';
import React from 'react';


export const YTPlayer = ({ videoId, opts }) =>{
    const default_opts={height: '390', width: '640', playerVars: {autoplay: 0,},}
    return(

        <YouTube videoId={videoId} opts={{default_opts}} />
    )

}

