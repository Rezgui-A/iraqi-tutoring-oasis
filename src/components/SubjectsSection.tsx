import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, BookOpen, Globe, Atom, Palette, Code, Languages, Music } from "lucide-react";

interface SubjectsSectionProps {
  language: "en" | "ar";
}

const SubjectsSection = ({ language }: SubjectsSectionProps) => {
  const content = {
    en: {
      title: "Popular Subjects",
      subtitle: "Expert tutoring across all academic levels",
      subjects: [
        { name: "Mathematics", icon: Calculator, students: "2,500+", color: "blue" },
        { name: "Science", icon: Atom, students: "1,800+", color: "green" },
        { name: "English", icon: BookOpen, students: "2,200+", color: "purple" },
        { name: "Arabic", icon: Languages, students: "1,500+", color: "orange" },
        { name: "Geography", icon: Globe, students: "900+", color: "teal" },
        { name: "Art", icon: Palette, students: "600+", color: "pink" },
        { name: "Programming", icon: Code, students: "1,200+", color: "indigo" },
        { name: "Music", icon: Music, students: "400+", color: "yellow" },
      ],
    },
    ar: {
      title: "المواد الشائعة",
      subtitle: "تدريس متخصص في جميع المستويات الأكاديمية",
      subjects: [
        { name: "الرياضيات", icon: Calculator, students: "+2,500", color: "blue" },
        { name: "العلوم", icon: Atom, students: "+1,800", color: "green" },
        { name: "الإنجليزية", icon: BookOpen, students: "+2,200", color: "purple" },
        { name: "العربية", icon: Languages, students: "+1,500", color: "orange" },
        { name: "الجغرافيا", icon: Globe, students: "+900", color: "teal" },
        { name: "الفن", icon: Palette, students: "+600", color: "pink" },
        { name: "البرمجة", icon: Code, students: "+1,200", color: "indigo" },
        { name: "الموسيقى", icon: Music, students: "+400", color: "yellow" },
      ],
    },
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
      green: "bg-green-100 text-green-600 hover:bg-green-200",
      purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
      orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
      teal: "bg-teal-100 text-teal-600 hover:bg-teal-200",
      pink: "bg-pink-100 text-pink-600 hover:bg-pink-200",
      indigo: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
      yellow: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="subjects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{content[language].title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content[language].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content[language].subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${getColorClasses(subject.color)} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-500">
                    {subject.students} {language === "en" ? "students" : "طالب"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
