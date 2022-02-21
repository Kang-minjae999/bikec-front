import { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// ------------------------------------------
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// ------------------------------------------
import axios from '../../utils/axios';
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
  '& .ql-toolbar.ql-snow': {
    border: 'none',
    borderBottom: `solid 1px ${theme.palette.grey[500_32]}`,
    '& .ql-formats': {
      '&:not(:last-of-type)': {
        marginRight: theme.spacing(2),
      },
    },

    // Button
    '& button': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      color: theme.palette.text.primary,
    },

    // Icon svg
    '& button svg, span svg': {
      width: 20,
      height: 20,
    },

    // Select
    '& .ql-picker-label': {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
      '& .ql-stroke': {
        stroke: theme.palette.text.primary,
      },
    },
    '& .ql-color,& .ql-background,& .ql-align ': {
      '& .ql-picker-label': {
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    '& .ql-expanded': {
      '& .ql-picker-label': {
        borderRadius: 4,
        color: theme.palette.text.disabled,
        borderColor: 'transparent !important',
        backgroundColor: theme.palette.action.focus,
        '& .ql-stroke': { stroke: theme.palette.text.disabled },
      },
      '& .ql-picker-options': {
        padding: 0,
        marginTop: 4,
        border: 'none',
        maxHeight: 200,
        overflow: 'auto',
        boxShadow: theme.customShadows.z20,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
      },
      '& .ql-picker-item': {
        color: theme.palette.text.primary,
      },

      // Align
      '&.ql-align': {
        '& .ql-picker-options': { padding: 0, display: 'flex' },
        '& .ql-picker-item': {
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      // Color & Background
      '&.ql-color, &.ql-background': {
        '& .ql-picker-options': { padding: 8 },
        '& .ql-picker-item': {
          margin: 3,
          borderRadius: 4,
          '&.ql-selected': { border: 'solid 1px black' },
        },
      },
      // Font, Size, Header
      '&.ql-font, &.ql-size, &.ql-header': {
        '& .ql-picker-options': {
          padding: theme.spacing(1, 0),
        },
        '& .ql-picker-item': {
          padding: theme.spacing(0.5, 1.5),
        },
      },
    },
  },
}));

// ----------------------------------------------------------------------

export default function EditorComponent() {
  const QuillRef = useRef(ReactQuill);
  const [contents, setContents] = useState('');
  const [url, seturl] = useState('');

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const accessToken = window.localStorage.getItem('accessToken');

    const input = document.createElement('input');
    const imageFile = new FormData();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        imageFile.append('image', file[0]);

        try {
          const response = await axios.post('/api/s3/image', {
            headers: {
              Authorization: accessToken,
              'content-type':"multipart/form-data",
            },
            imageFile,
            
          });

          seturl(response.data.data);

          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt=${url} />`);
          }

          return { ...response, success: true };
        } catch (error) {
          const err = error;
          return { ...err.response, success: false };
        }
      }
      return {};
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image', 'video'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <>
      <RootStyle>
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          onChange={setContents}
          modules={modules}
          placeholder="내용을 입력해주세요."
        />
      </RootStyle>
    </>
  );
}
