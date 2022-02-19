import { useRef, useState, useMemo } from "react";
import axios from 'axios';

// 이렇게 라이브러리를 불러와서 사용하면 됩니다

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";

import EditorToolbarStyle from "./EditorToolbarStyle";
import EditorToolbar from "./EditorToolbar";




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



export const EditorComponent = () => {
  const QuillRef = useRef(ReactQuill);
  const [contents, setContents] = useState("");
  const [url , seturl] = useState('');
  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
  	// 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const imageFiles = new FormData();

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

	// 파일이 input 태그에 담기면 실행 될 함수 
    input.onchange = async () => {
      const accessToken = window.localStorage.getItem('accessToken')
      const file = input.files;
      if (file !== null) {
        imageFiles.append("image", file[0]);

	// 저의 경우 파일 이미지를 서버에 저장했기 때문에
  // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
        try {
          const res = await axios.post('http://localhost:8080/api/board/free/image' , {
            headers: {
              accessToken
          },
           imageFiles
          })

	// 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
         seturl(res.data.url)

	// 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
  // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
            );
          }

          return { ...res, success: true };
        } catch (error) {
          const err = error ;
          return { ...err.response, success: false };
        }
      }
    };
  };

// quill에서 사용할 모듈을 설정하는 코드 입니다.
// 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
// useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
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
    <RootStyle >
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
       </RootStyle >
	</>
)}

