
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, BookOpen, Globe, Atom, Palette, Code, Languages, Music, ArrowRight, TrendingUp } from "lucide-react";

interface SubjectsSectionProps {
  language: "en" | "ar";
}

const SubjectsSection = ({ language }: SubjectsSectionProps) => {
  const content = {
    en: {
      badge: "📚 Popular Subjects",
      title: "Master Every Subject",
      subtitle: "Expert tutoring across all academic levels with personalized learning paths",
      viewAll: "View All Subjects",
      subjects: [
        { name: "Mathematics", icon: Calculator, students: "2,500+", color: "blue", trend: "+12%", description: "Algebra, Calculus, Statistics" },
        { name: "Science", icon: Atom, students: "1,800+", color: "green", trend: "+8%", description: "Physics, Chemistry, Biology" },
        { name: "English", icon: BookOpen, students: "2,200+", color: "purple", trend: "+15%", description: "Grammar, Literature, Writing" },
        { name: "Arabic", icon: Languages, students: "1,500+", color: "orange", trend: "+10%", description: "Grammar, Poetry, Composition" },
        { name: "Geography", icon: Globe, students: "900+", color: "teal", trend: "+6%", description: "World Geography, Maps" },
        { name: "Art", icon: Palette, students: "600+", color: "pink", trend: "+18%", description: "Drawing, Painting, Design" },
        { name: "Programming", icon: Code, students: "1,200+", color: "indigo", trend: "+25%", description: "Python, JavaScript, Web Dev" },
        { name: "Music", icon: Music, students: "400+", color: "yellow", trend: "+14%", description: "Theory, Instruments, Composition" },
      ],
    },
    ar: {
      badge: "📚 المواد الشائعة",
      title: "أتقن كل مادة",
      subtitle: "تدريس متخصص في جميع المستويات الأكاديمية مع مسارات تعلم شخصية",
      viewAll: "عرض جميع المواد",
      subjects: [
        { name: "الرياضيات", icon: Calculator, students: "+2,500", color: "blue", trend: "+12%", description: "الجبر، التفاضل والتكامل، الإحصاء" },
        { name: "العلوم", icon: Atom, students: "+1,800", color: "green", trend: "+8%", description: "الفيزياء، الكيمياء، الأحياء" },
        { name: "الإنجليزية", icon: BookOpen, students: "+2,200", color: "purple", trend: "+15%", description: "القواعد، الأدب، الكتابة" },
        { name: "العربية", icon: Languages, students: "+1,500", color: "orange", trend: "+10%", description: "النحو، الشعر، الإنشاء" },
        { name: "الجغرافيا", icon: Globe, students: "+900", color: "teal", trend: "+6%", description: "الجغرافيا العالمية، الخرائط" },
        { name: "الفن", icon: Palette, students: "+600", color: "pink", trend: "+18%", description: "الرسم، التلوين، التصميم" },
        { name: "البرمجة", icon: Code, students: "+1,200", color: "indigo", trend: "+25%", description: "بايثون، جافا سكريبت، تطوير الويب" },
        { name: "الموسيقى", icon: Music, students: "+400", color: "yellow", trend: "+14%", description: "النظرية، الآلات، التأليف" },
      ],
    },
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      teal: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      pink: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
      indigo: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      yellow: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="subjects" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
            {content[language].badge}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content[language].subtitle}
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content[language].subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-white overflow-hidden">
                <CardHeader className="text-center pb-4 relative">
                  {/* Trend Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-700 text-xs flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {subject.trend}
                    </Badge>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getColorClasses(subject.color)} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{subject.students}</span>
                    <span className="text-gray-500 text-sm">
                      {language === "en" ? "students" : "طالب"}
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                  >
                    {language === "en" ? "Learn More" : "تعلم المزيد"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 h-auto border-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
          >
            {content[language].viewAll}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
