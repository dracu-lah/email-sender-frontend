import { useMemo, useEffect, useState, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import Quill from "quill";
import ReactQuill from "react-quill-new";
import ImageResize from "quill-image-resize-module-react";
import { cn } from "@/lib/utils";
import "./quill.custom.css";
import endPoint from "@/services/endPoint";
import { BASE_URL } from "@/configs/axios";
import { UploadImageAPI } from "@/components/uploaders/ImageCrop/api";

// Register modules
function registerQuillModules() {
  const AlignStyle = Quill.import("attributors/style/align");
  Quill.register(AlignStyle, true);
  const BackgroundStyle = Quill.import("attributors/style/background");
  Quill.register(BackgroundStyle, true);
  const ColorStyle = Quill.import("attributors/style/color");
  Quill.register(ColorStyle, true);
  const FontStyle = Quill.import("attributors/style/font");
  FontStyle.whitelist = ["arial", "times", "georgia", "wensley"];
  Quill.register(FontStyle, true);
  const SizeStyle = Quill.import("attributors/style/size");
  Quill.register(SizeStyle, true);

  const imageResize = ImageResize;
  Quill.register("modules/imageResize", imageResize);
}

const QuillEditor = ({ placeholder, className, value, onChange }) => {
  const [isMounted, setIsMounted] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    registerQuillModules();
    setIsMounted(true);
  }, []);

  const insertImage = (quill, imageUrl) => {
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, "image", imageUrl, "user");
    quill.setSelection(range.index + 1);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          ["clean"],
          [{ font: ["arial", "times", "georgia", "wensley"] }],
          [{ align: [] }],
        ],
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                try {
                  const { data } = await UploadImageAPI(
                    `${BASE_URL}${endPoint.sendBannerImage}`,
                    file,
                  );
                  const editor = this.quill;
                  insertImage(editor, data);
                } catch (err) {
                  console.error(err);
                }
              }
            };
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    [],
  );

  const formats = [
    "align",
    "background",
    "bold",
    "color",
    "font",
    "header",
    "italic",
    "link",
    "list",
    "underline",
    "size",
    "image",
  ];

  return (
    <div>
      {isMounted && (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          className={cn("w-full", className)}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default QuillEditor;
