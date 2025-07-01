
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Users, 
  Share, 
  MoreVertical,
  Clock,
  Square,
  Circle
} from "lucide-react";

const VideoCall = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);  
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Mathematics Session</span>
          </div>
          <div className="text-gray-300 text-sm">
            with د. أحمد محمد
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Session Timer */}
          <div className="flex items-center space-x-2 text-white">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(sessionTime)}</span>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center space-x-2 text-red-400">
              <Circle className="h-3 w-3 fill-current animate-pulse" />
              <span className="text-sm">Recording</span>
            </div>
          )}

          {/* Participants */}
          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="h-4 w-4" />
            <span className="text-sm">2</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          {/* Main Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
            <div className="text-center text-gray-400">
              <Video className="h-24 w-24 mx-auto mb-4 opacity-50" />
              <p className="text-lg">د. أحمد محمد</p>
              <p className="text-sm">Camera is off</p>
            </div>

            {/* Student Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-tutor-yellow">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 bg-tutor-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-tutor-yellow font-medium">أ</span>
                </div>
                <p className="text-sm">You</p>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`rounded-full w-12 h-12 p-0 ${
                  isAudioOn 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'bg-red-500 hover:bg-red-600 border-red-500'
                }`}
              >
                {isAudioOn ? (
                  <Mic className="h-5 w-5 text-white" />
                ) : (
                  <MicOff className="h-5 w-5 text-white" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`rounded-full w-12 h-12 p-0 ${
                  isVideoOn 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'bg-red-500 hover:bg-red-600 border-red-500'
                }`}
              >
                {isVideoOn ? (
                  <Video className="h-5 w-5 text-white" />
                ) : (
                  <VideoOff className="h-5 w-5 text-white" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={`rounded-full w-12 h-12 p-0 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 border-red-500' 
                    : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                }`}
              >
                <Square className="h-5 w-5 text-white" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 bg-gray-700 hover:bg-gray-600 border-gray-600"
              >
                <Share className="h-5 w-5 text-white" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 bg-gray-700 hover:bg-gray-600 border-gray-600"
              >
                <MessageSquare className="h-5 w-5 text-white" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 bg-gray-700 hover:bg-gray-600 border-gray-600"
              >
                <MoreVertical className="h-5 w-5 text-white" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndCall}
                className="rounded-full w-12 h-12 p-0 bg-red-500 hover:bg-red-600"
              >
                <Phone className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Whiteboard Panel */}
        <div className="w-96 bg-white border-l border-gray-300 flex flex-col">
          {/* Whiteboard Header */}
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-nunito font-semibold text-lg text-gray-900">Interactive Whiteboard</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Button
                size="sm"
                variant={isDrawing ? "default" : "outline"}
                onClick={() => setIsDrawing(!isDrawing)}
                className="text-xs"
              >
                ✏️ Draw
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                📝 Text
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                🔄 Clear
              </Button>
            </div>
          </div>

          {/* Whiteboard Area */}
          <div className="flex-1 bg-white p-4">
            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-sm">
                  {isDrawing ? "Click and drag to draw" : "Select a tool to start"}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="h-64 border-t bg-gray-50">
            <div className="p-4 border-b">
              <h4 className="font-medium text-gray-900">Session Chat</h4>
            </div>
            <div className="flex-1 p-4 space-y-3 max-h-48 overflow-y-auto">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-tutor-green">د. أحمد محمد</p>
                <p className="text-sm text-gray-700">Let's start with quadratic equations today</p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
              <div className="bg-tutor-yellow/10 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900">You</p>
                <p className="text-sm text-gray-700">Sounds good, I have some questions ready</p>
                <p className="text-xs text-gray-500 mt-1">1 minute ago</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tutor-green"
                />
                <Button size="sm" className="btn-secondary">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
