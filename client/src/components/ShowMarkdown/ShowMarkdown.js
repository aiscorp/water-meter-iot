import React, {useEffect, useState} from 'react'
import marked from 'marked'

const ShowMarkdown = props => {
  const {markdownUrl} = props

  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    fetch(markdownUrl)
      .then(response => {
        return response.text()
      })
      .then(text => {
        setMarkdown(marked(text))
      })
  }, [markdownUrl])

  return (
      <div dangerouslySetInnerHTML={{__html: markdown}} className="col mx-auto"/>
  )
}

export default ShowMarkdown
