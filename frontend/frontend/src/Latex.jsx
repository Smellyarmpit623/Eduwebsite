import React, { useEffect } from 'react';

import Latex from 'react-latex'
import 'katex/dist/katex.min.css'

export const LatexComponent = ({input}) => {

    return(
        <Latex>{input}</Latex>
    )
}