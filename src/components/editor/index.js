import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { useMemo, useRef, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import axios from '../../utils/axios';
import EditorToolbar, { formats, redoChange, undoChange } from './EditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}) {
  const QuillRef = useRef();
  const [url, seturl] = useState('');

  const imageHandler = () => {
    const accessToken = window.localStorage.getItem('accessToken');
    // const form = document.createElement('form');
    // form.setAttribute('enctype', 'multipart/form-data');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*/*');
    input.setAttribute('name', 'imageFile');
    // input.setAttribute('processData', false);
    // input.setAttribute('contentType', false);
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('imageFile', file);
      if (file !== null) {
        try {
          const response = await axios.post('/api/s3/image', formData, {
            headers: {
              'content-type': 'multipart/form-data',
              // enctype: 'multipart/form-data',
              // processData: false,
              // contentType: false,
              Authorization: accessToken,
            },
          });
          console.log(response.data.data);
          seturl(response.data.data);
          const url2 = response.data.data

          // console.log(seturl);
            /* const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url2} alt='asas' />`);
          } 
          return { ...response, success: true }; */

          const editor = QuillRef.current.getEditor(); // 에디터 객체 가져오기
          // 1. 에디터 root의 innerHTML을 수정해주기
          // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
          // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
          // editor.root.innerHTML =
          //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.
    
          // 2. 현재 에디터 커서 위치값을 가져온다
          const range = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, 'image', url2);

        } catch (error) {
          const err = error;
          return { ...err.response, success: false };
        }
      }
      return {};
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: `#${id}`,
      handlers: {
        image: imageHandler
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  }),[])

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
