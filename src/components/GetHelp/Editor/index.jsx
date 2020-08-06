/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import propTypes from 'prop-types';
import uploadImageCallBack from './uploadImage';
import './react-draft-wysiwyg.scss';

const TextEditor = ({ setText, isSent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  useEffect(() => {
    if (isSent) {
      setEditorState(EditorState.createEmpty());
    }
  }, [isSent]);
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  setText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div className="editor">
      <Editor
        editorClassName="edit-text-custum"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'fontSize',
            'textAlign',
            'embedded',
            'image',
            'remove',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          blockType: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
        placeholder="Type your inquiry here"
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  setText: propTypes.func.isRequired,
  isSent: propTypes.bool.isRequired,
};

export default TextEditor;