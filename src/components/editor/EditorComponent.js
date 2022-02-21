import { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// ------------------------------------------
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// ------------------------------------------
// import multer from 'multer';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

// multer 설정
// const upload = multer({
//   storage: multer.diskStorage({
//     // 저장할 장소
//     destination(req, file, cb) {
//       cb(null, 'public/uploads');
//     },
//     // 저장할 이미지의 파일명
//     filename(req, file, cb) {
//       const ext = extname(file.originalname); // 파일의 확장자
//       console.log('file.originalname', file.originalname);
//       // 파일명이 절대 겹치지 않도록 해줘야한다.
//       // 파일이름 + 현재시간밀리초 + 파일확장자명
//       cb(null, basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
// });
// 하나의 이미지 파일만 가져온다.
// const app = () => {
//   app.post('/img', upload.single('img'), (req, res) => {
//     // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
//     // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
//     console.log('전달받은 파일', req.file);
//     console.log('저장된 파일의 이름', req.file.filename);

//     // 파일이 저장된 경로를 클라이언트에게 반환해준다.
//     const IMG_URL = `http://localhost:3000/uploads/${req.file.filename}`;
//     console.log(IMG_URL);
//     res.json({ url: IMG_URL });
//   });
// };

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

export default function EditorComponent({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}) {
  const QuillRef = useRef(ReactQuill);
  const [contents, setContents] = useState('');
  const [url, seturl] = useState('');

  // 이미지를 업로드 하기 위한 함수
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
              Authorization: accessToken,
            },
          });

          console.log(response.data.data);
          seturl(response.data.data);


          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt='as' />`);
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
          value={value}
          onChange={onchange}
          modules={modules}
          placeholder="내용을 입력해주세요."
        />
      </RootStyle>
    </>
  );
}