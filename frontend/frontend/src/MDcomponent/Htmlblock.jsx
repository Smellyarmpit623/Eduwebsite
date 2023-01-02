import React from 'react'
import Code from './CodeBlock';

const Htmlblock = ({value}) => {
  return (
    <Code>{value.value}</Code>
  )
}

export default Htmlblock