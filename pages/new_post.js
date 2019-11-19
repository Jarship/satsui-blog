import { useState } from 'react';
import { Box } from 'rebass';
import Editor from '../components/draft-rte';

const NewPost = () => {
  const [text, setText] = useState('');
  return (
    <Box width={[1]}>
      {/* <button>Save</button> */}
      <Editor editorState={text} onEditorStateChange={setText} />
    </Box>
  );
};

export default NewPost;
