/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  BarChart3, 
  User, 
  Star, 
  Loader2, 
  RefreshCw 
} from "lucide-react";

interface ChildCardProps {
  child: {
    pic_url: string;
    id: string;
    name: string;
    grade: string;
    photoUrl?: string;
    subjects?: string[];
    completedSessions: number;
    totalSessions: number;
    averageGrade: number;
  };
  t: {
    children: {
      sessionProgress: string;
      avgGrade: string;
      subjects: string;
      viewReport: string;
      noSubjects: string;
      subjectsError: string;
    };
    error: string;
    loading: string;
  };
  language: string;
  navigate: ReturnType<typeof useNavigate>;
  API_BASE_URL: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const ChildCard = ({ child , t, language, navigate, API_BASE_URL }: ChildCardProps) => {
      console.log('Child ID in render:', child); // Check if ID exists on render
    

  const [subjects, setSubjects] = useState<string[]>(child.subjects || []);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    console.log('Child ID in fetchSubjects:', child.id); // Check when called

    try {
      setLoadingSubjects(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/api/student/${child.id}/subjects`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSubjects(response.data.subjects);
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      setError(t.children.subjectsError || "Failed to load subjects");
      toast({
        title: t.error,
        description: t.children.subjectsError || "Could not fetch subjects",
        variant: "destructive",
      });
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    if (!child.subjects || child.subjects.length === 0) {
      fetchSubjects();
    }
  }, [child.id]);
  const [previewUrl, setPreviewUrl] = useState(
    child?.pic_url 
      ? `${API_BASE_URL}${child.pic_url.startsWith('/') ? '' : '/'}${child.pic_url}?t=${Date.now()}`
      : ''
  );
  return (
    <Card key={child.id} className="hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
      <div className="relative h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={child.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="text-blue-600 font-medium">
            {child.name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
          <div className={language === "ar" ? "text-right" : "text-left"}>
            <CardTitle className="text-lg font-semibold">{child.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
              {child.grade}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{t.children.sessionProgress}</span>
              <Badge variant="outline" className="bg-green-50 text-green-600">
                {child.completedSessions}/{child.totalSessions}
              </Badge>
            </div>
            <Progress value={(child.completedSessions / child.totalSessions) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{t.children.avgGrade}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{child.averageGrade}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
                style={{ width: `${child.averageGrade}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">{t.children.subjects}:</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fetchSubjects}
                disabled={loadingSubjects}
                className="h-8 px-2"
              >
                {loadingSubjects ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
              </Button>
            </div>
            
            {loadingSubjects && subjects.length === 0 ? (
              <div className="flex justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">{t.loading}</span>
              </div>
            ) : error ? (
              <div className="text-center py-2 text-sm text-red-500">
                {error}
              </div>
            ) : subjects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-white shadow-sm">
                    {subject}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                {t.children.noSubjects}
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-blue-200 hover:bg-blue-50"
              onClick={() => navigate(`/parent/student/${child.id}/reports`)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {t.children.viewReport}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:bg-blue-50"
              onClick={() => navigate(`/parent/student/${child.id}`)}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildCard;