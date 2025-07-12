import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSubmit: (file: File) => void;
  language: "en" | "ar";
  assignment?: {
    id: number;
    title: string;
    course: string;
  };
}

const FileUpload = ({ onFileSubmit, language, assignment }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
      }
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (selectedFile) {
      onFileSubmit(selectedFile);
    }
  }, [selectedFile, onFileSubmit]);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {assignment && (
        <div className="mb-4">
          <h3 className="font-medium text-gray-900">
            {language === "en" ? "Assignment" : "الواجب"}: {assignment.title}
          </h3>
          <p className="text-sm text-gray-600">
            {language === "en" ? "Course" : "المادة"}: {assignment.course}
          </p>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {!selectedFile ? (
          <label className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                {language === "en"
                  ? "Drag and drop your file here, or click to select"
                  : "اسحب وأسقط ملفك هنا، أو انقر للاختيار"}
              </p>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.zip"
              />
              <Button variant="outline" size="sm">
                {language === "en" ? "Select File" : "اختر ملف"}
              </Button>
            </div>
          </label>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{selectedFile.name}</span>
              <button
                onClick={removeFile}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={handleSubmit}>
              {language === "en" ? "Submit Assignment" : "تسليم الواجب"}
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        {language === "en"
          ? "Accepted file types: PDF, DOC, DOCX, TXT, ZIP (Max size: 10MB)"
          : "صيغ الملفات المقبولة: PDF, DOC, DOCX, TXT, ZIP (الحد الأقصى: 10 ميجابايت)"}
      </div>
    </div>
  );
};

export default FileUpload;