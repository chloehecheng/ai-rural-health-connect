import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, Calendar, Pill, Phone, FileText } from "lucide-react";

const commonQuestions = [
  {
    text: "How do I schedule an appointment?",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    text: "When should I take my medications?",
    icon: <Pill className="w-5 h-5" />,
  },
  {
    text: "How do I contact my doctor?",
    icon: <Phone className="w-5 h-5" />,
  },
  {
    text: "Where can I find my test results?",
    icon: <FileText className="w-5 h-5" />,
  },
];

export const AIHealthAssistant = () => {
  const [message, setMessage] = useState("");

  const handleQuestionClick = (question: string) => {
    // TODO: Implement AI response handling
    console.log("Question clicked:", question);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // TODO: Implement AI response handling
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <Card className="p-6 bg-white shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Healthcare Assistant</h2>
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-600 mb-4">
          Hello! I'm here to help you with any questions about your healthcare. 
          You can ask me about appointments, medications, or any other concerns.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonQuestions.map((q, i) => (
            <Button
              key={i}
              variant="outline"
              className="flex items-center gap-2 text-left h-auto p-4 text-lg"
              onClick={() => handleQuestionClick(q.text)}
            >
              {q.icon}
              <span>{q.text}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          className="text-lg p-6"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage}
          className="px-6"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};
