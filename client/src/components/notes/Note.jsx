import React, { useEffect, useMemo, useState } from 'react'
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom'
import { Box, debounce } from '@mui/material'

function Note() {
  const { note } = useLoaderData()
  const submit = useSubmit()
  const location = useLocation()
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })

  const [rawHTML, setRawHTML] = useState(note.content)

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return

      submit(
        { ...note, content: rawHTML },
        {
          method: 'post',
          action: pathname,
        }
      )
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    setEditorState(EditorState.createWithContent(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id])

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname])

  useEffect(() => {
    setRawHTML(note.content)
  }, [note.content])

  const handleOnChange = (e) => {
    setEditorState(e)
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  return (
    <Box px={1}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="Write something!"
      />
    </Box>
  )
}

export default Note
