import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, label, control, defaultValue = "", error, className = "" }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <label className="inline-block mb-1 pl-1">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Ensure default value is set
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="your-api-key"
            value={value} // Controlled value from form
            onEditorChange={onChange} // Handle editor changes via form
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
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            className={`${className} border ${error ? "border-red-600" : "border-[#ddd]"} px-3 py-3 rounded`}
          />
        )}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default RTE;
