import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";

// TODO: Replace with dynamic data from API/database
const mockSubmissions = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:25",
    status: "Passed",
    runtime: "45ms",
    memory: "12.3MB",
    code: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    language: "Python"
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:25:10",
    status: "Failed",
    runtime: "TLE",
    memory: "15.2MB",
    code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    language: "Python"
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:20:45",
    status: "Failed",
    runtime: "Runtime Error",
    memory: "N/A",
    code: `def twoSum(nums, target):
    # Incomplete solution
    return nums[0] + nums[1]`,
    language: "Python"
  }
];

const SubmissionHistory = () => {
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<number>>(new Set());

  const toggleExpanded = (submissionId: number) => {
    const newExpanded = new Set(expandedSubmissions);
    if (newExpanded.has(submissionId)) {
      newExpanded.delete(submissionId);
    } else {
      newExpanded.add(submissionId);
    }
    setExpandedSubmissions(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Passed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed":
        return "bg-success text-white";
      case "Failed":
        return "bg-destructive text-white";
      default:
        return "bg-warning text-white";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Submission History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockSubmissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No submissions yet. Run your code to see submission history.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockSubmissions.map((submission) => (
              <Collapsible key={submission.id}>
                <div className="border rounded-lg p-4">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto"
                      onClick={() => toggleExpanded(submission.id)}
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(submission.status)}
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {submission.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Runtime: {submission.runtime}</span>
                            <span>Memory: {submission.memory}</span>
                            <span>Language: {submission.language}</span>
                          </div>
                        </div>
                      </div>
                      {expandedSubmissions.has(submission.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-4">
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Submitted Code:</h4>
                      <pre className="text-sm bg-editor-bg p-3 rounded border overflow-x-auto">
                        <code>{submission.code}</code>
                      </pre>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionHistory;