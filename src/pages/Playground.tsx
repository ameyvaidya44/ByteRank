import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { Play, RotateCcw, Download } from "lucide-react";

const starterTemplates = {
  python: `# Python Playground
print("Hello, ByteRank!")

# Write your code here
def main():
    pass

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript Playground
console.log("Hello, ByteRank!");

// Write your code here
function main() {
    
}

main();`,
  java: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ByteRank!");
        
        // Write your code here
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, ByteRank!" << endl;
    
    // Write your code here
    
    return 0;
}`,
};

const Playground = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(starterTemplates.python);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(starterTemplates[language as keyof typeof starterTemplates]);
    setOutput("");
  };

  const handleRun = () => {
    setOutput("Running your code...\n\nHello, ByteRank!\n\nExecution completed successfully! ✓");
  };

  const handleReset = () => {
    setCode(starterTemplates[selectedLanguage as keyof typeof starterTemplates]);
    setOutput("");
  };

  const handleDownload = () => {
    const extensions = {
      python: 'py',
      javascript: 'js',
      java: 'java',
      cpp: 'cpp'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground.${extensions[selectedLanguage as keyof typeof extensions]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Code Playground</h1>
          <p className="text-muted-foreground">
            Write and test your code in our online editor. Perfect for experimenting with algorithms and quick prototyping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
          {/* Code Editor */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 font-mono text-sm resize-none bg-editor-bg border-editor-border"
                placeholder="Write your code here..."
              />
              
              <div className="mt-4">
                <Button onClick={handleRun} className="w-full" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Run Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {output ? (
                <pre className="text-sm whitespace-pre-wrap bg-editor-bg p-4 rounded border h-full overflow-auto">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Run Code" to see the output here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Playground;