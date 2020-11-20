import React, { useState, useRef } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

const Editor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [htmlValue, sethtmlValue] = useState();
  const valueGetter = useRef();
  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }
  function handleShowValue() {
    unified()
      .use(markdown)
      .use(html)
      .process(valueGetter.current(), (err, data) => {
        if (err) console.log(err);
        sethtmlValue(data.contents);
      });
  }

  function processMD() {
    unified()
      .use(markdown)
      .use(html)
      .process(valueGetter.current(), (err, data) => {
        if (err) console.log(err);
        sethtmlValue(data.contents);
      });
  }

  function listenEditorChanges() {
    unified()
      .use(markdown)
      .use(html)
      .process(valueGetter.current(), (err, data) => {
        if (err) console.log(err);
        sethtmlValue(data.contents);
      });
  }
  return (
    <>
      <div className='flex'>
        <ControlledEditor
          height='90vh'
          language='markdown'
          theme='dark'
          width='50%'
          editorDidMount={handleEditorDidMount}
          onChange={() => {
            processMD();
          }}
        />
        <div className='w-1/2'>
          <div className='w-11/12 mx-auto'>
            <div dangerouslySetInnerHTML={{ __html: htmlValue }}></div>
          </div>
        </div>
      </div>
      <button onClick={handleShowValue} disabled={!isEditorReady}>
        Show value
      </button>
    </>
  );
};

export default Editor;
