import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, Check, ChevronDown } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
}

const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.flag} {currentLanguage?.nativeName}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => onLanguageChange(lang.code as "en" | "ar")} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.nativeName}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </div>
            </div>
            {language === lang.code && <Check className="h-4 w-4 text-blue-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
