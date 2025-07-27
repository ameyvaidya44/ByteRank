import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import SubmissionHistory from "@/components/SubmissionHistory";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { Play, RotateCcw, Bug, Download, Bookmark, BookmarkCheck } from "lucide-react";
import { useParams, Link } from "react-router-dom";

const mockQuestion = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  company: "Google",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**
Input: nums = [3,3], target = 6
Output: [0,1]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
  starterCode: {
    python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
  },
};

const QuestionView = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(mockQuestion.starterCode.python);
  const [output, setOutput] = useState("");
  const [debugOutput, setDebugOutput] = useState("");
  const [showDebugSection, setShowDebugSection] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-success text-white";
      case "Medium":
        return "bg-warning text-white";
      case "Hard":
        return "bg-destructive text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(mockQuestion.starterCode[language as keyof typeof mockQuestion.starterCode]);
  };

  const handleSubmit = () => {
    setOutput("Running your code...\n\nTest Case 1: Passed ✓\nTest Case 2: Passed ✓\nTest Case 3: Passed ✓\n\nAll test cases passed! 🎉");
  };

  const handleReset = () => {
    setCode(mockQuestion.starterCode[selectedLanguage as keyof typeof mockQuestion.starterCode]);
    setOutput("");
    setDebugOutput("");
    setShowDebugSection(false);
  };

  const handleDebug = () => {
    // TODO: Integrate with AI debugging service
    // This will receive:
    // - Full question: mockQuestion.description
    // - User's code: code
    // - Input test cases: (to be added)
    // - Actual output: output
    setDebugOutput("🤖 AI Analysis:\n\nYour code looks good! Here are some observations:\n\n1. ✅ You're using the correct approach with a hash map\n2. ⚠️  Consider edge cases like empty arrays\n3. 💡 Time complexity: O(n), Space complexity: O(n)\n\nSuggestion: Add input validation for better robustness.");
    setShowDebugSection(true);
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    // This should export:
    // - Question title: mockQuestion.title
    // - Full problem description: mockQuestion.description
    // - User's current code: code
    console.log("Exporting to PDF...");
    alert("PDF export functionality will be implemented here. This will include the question, description, and your current code.");
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Save bookmark state to backend/localStorage
  };

  // Keyboard shortcuts handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          handleSubmit();
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          handleDebug();
          break;
        case '/':
          e.preventDefault();
          // TODO: Implement comment/uncomment functionality
          console.log("Comment/uncomment functionality to be implemented");
          break;
      }
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to="/dashboard" className="text-primary hover:underline text-sm">
            ← Back to Problems
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question Description */}
          <div className="space-y-4 lg:h-[calc(100vh-200px)]">
            <Card className="h-full overflow-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{mockQuestion.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getDifficultyColor(mockQuestion.difficulty)}>
                        {mockQuestion.difficulty}
                      </Badge>
                      <Badge variant="secondary">{mockQuestion.company}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleBookmark}
                        className="p-1 h-auto"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {mockQuestion.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {mockQuestion.description}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <KeyboardShortcuts />
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-64 font-mono text-sm resize-none bg-editor-bg border-editor-border"
                  placeholder="Write your code here..."
                />
                
                <div className="mt-4 space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </Button>
                    <Button onClick={handleDebug} variant="outline" className="flex-1">
                      <Bug className="mr-2 h-4 w-4" />
                      Debug
                    </Button>
                  </div>
                  
                  {output && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Output</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-sm whitespace-pre-wrap bg-editor-bg p-3 rounded border">
                          {output}
                        </pre>
                      </CardContent>
                    </Card>
                  )}

                  {showDebugSection && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Bug className="h-4 w-4" />
                          AI Debug Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-sm whitespace-pre-wrap bg-editor-bg p-3 rounded border">
                          {debugOutput || "AI feedback will appear here"}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submission History */}
            <SubmissionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;