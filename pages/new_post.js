import { useState } from "react";
import Editor from "../components/draft-rte";
import { Box } from "rebass";

const NewPost = () => {
  const [text,setText] = useState('');
  return (
    <Box width={[1]}>
      <button>Save</button>
      <Editor editorState={text} onEditorStateChange={setText} />
    </Box>
  );
};

export default NewPost;