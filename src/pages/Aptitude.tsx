import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TODO: Replace with dynamic data from API/database
// NOTE: You can edit the correctAnswer field (0-indexed) for each question to change the correct option
const mockAptitudeQuestions = [
  {
    id: 1,
    question: "If a train travels 120 km in 2 hours, what is its average speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Speed & Distance",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Percentage",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
    options: ["8", "10", "12", "15"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Ratio & Proportion",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. What is his profit percentage?",
    options: ["10%", "12%", "15%", "20%"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Profit & Loss",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "In how many ways can 5 people sit in a row?",
    options: ["60", "120", "240", "360"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Permutation",
    difficulty: "Hard"
  },
  {
    id: 6,
    question: "What is the compound interest on Rs. 1000 for 2 years at 10% per annum?",
    options: ["Rs. 200", "Rs. 210", "Rs. 220", "Rs. 230"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Compound Interest",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "If log₂(x) = 3, what is the value of x?",
    options: ["6", "8", "9", "12"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Logarithms",
    difficulty: "Hard"
  },
  {
    id: 8,
    question: "A pipe can fill a tank in 6 hours. Another pipe can empty it in 8 hours. If both pipes are opened, in how many hours will the tank be filled?",
    options: ["20 hours", "24 hours", "28 hours", "30 hours"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Time & Work",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Number Series",
    difficulty: "Easy"
  },
  {
    id: 10,
    question: "If sin θ = 3/5, what is cos θ?",
    options: ["3/4", "4/5", "5/4", "4/3"],
    correctAnswer: 1, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Trigonometry",
    difficulty: "Hard"
  },
  // Add more questions here as needed...
  {
    id: 11,
    question: "A car covers 300 km in 5 hours. What is its speed in m/s?",
    options: ["16.67 m/s", "18.33 m/s", "20 m/s", "22.5 m/s"],
    correctAnswer: 0, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Speed & Distance",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "What is 25% of 80% of 400?",
    options: ["60", "70", "80", "90"],
    correctAnswer: 2, // EDIT: Change this to 0, 1, 2, or 3 to set the correct option
    category: "Percentage",
    difficulty: "Medium"
  }
];

const QUESTIONS_PER_PAGE = 5;

const Aptitude = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const totalPages = Math.ceil(mockAptitudeQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = mockAptitudeQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Hard":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  // Function to get option styling based on answer status
  const getOptionStyle = (questionId: number, optionIndex: number) => {
    const question = mockAptitudeQuestions.find(q => q.id === questionId);
    const selectedAnswer = selectedAnswers[questionId];
    const isAnswered = answeredQuestions.has(questionId);
    
    if (!isAnswered || !question) {
      return "border-gray-200 hover:border-gray-300";
    }
    
    const isSelected = selectedAnswer === optionIndex;
    const isCorrect = optionIndex === question.correctAnswer;
    
    if (isCorrect) {
      return "border-green-500 bg-green-50 text-green-700";
    } else if (isSelected && !isCorrect) {
      return "border-red-500 bg-red-50 text-red-700";
    } else {
      return "border-gray-200 opacity-60";
    }
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    
    // Mark question as answered for styling
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <Button
          key="prev"
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className="min-w-[40px]"
        >
          {i}
        </Button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <Button
          key="next"
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {pages}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Aptitude Questions</h1>
          <p className="text-muted-foreground">
            Practice quantitative aptitude questions to improve your problem-solving skills.
          </p>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((question, index) => (
            <Card key={question.id} className="w-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">
                    Question {startIndex + index + 1}: {question.question}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{question.category}</Badge>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex} 
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(question.id, optionIndex)}`}
                    >
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`q${question.id}-option${optionIndex}`}
                        className="text-primary"
                      />
                      <Label
                        htmlFor={`q${question.id}-option${optionIndex}`}
                        className="cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {renderPagination()}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + QUESTIONS_PER_PAGE, mockAptitudeQuestions.length)} of {mockAptitudeQuestions.length} questions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aptitude;
