import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
}

interface TeachersListProps {
  teachers: Teacher[];
  language: "en" | "ar";
  onMessage: (teacherId: number) => void;
}

const TeachersList = ({ teachers, language, onMessage }: TeachersListProps) => {
  return (
    <div className="space-y-4">
      {teachers.map((teacher) => (
        <div key={teacher.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className={language === "ar" ? "text-right" : "text-left"}>
            <h3 className="font-medium text-gray-900">{teacher.name}</h3>
            <p className="text-sm text-gray-600">
              {language === "en" ? "Subject" : "المادة"}: {teacher.subject}
            </p>
            <p className="text-xs text-gray-500">{teacher.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMessage(teacher.id)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {language === "en" ? "Message" : "رسالة"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TeachersList;