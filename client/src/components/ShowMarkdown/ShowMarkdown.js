import React from 'react'
import marked from 'marked'

const ShowMarkdown = props => (
  <div
    dangerouslySetInnerHTML={{__html: marked(props.text)}}
    className="col mx-auto px-2 my-1"
  />
)

export default ShowMarkdown
