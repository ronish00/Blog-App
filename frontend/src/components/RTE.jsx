import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const RTE = React.forwardRef(({ label, content, className = "", onEditorChange, ...props }, ref) => {
  const handleEditorInit = (evt, editor) => {
    // Set the ref to the TinyMCE editor instance
    ref.current = editor;
    console.log("Editor initialized", editor);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="inline-block mb-1 pl-1">{label}</label>
      <Editor
        apiKey="miwwo2dunlgxnad83kc9o8xe80v4o4bj70b3iw6r9lkddk4i"
        className={`${className} border border-[#ddd] px-3 py-3 rounded`}
        initialValue={content} // Fixed prop name
        onEditorChange={onEditorChange}
        onInit={handleEditorInit} // Capture editor instance on initialization
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
});

export default RTE;
