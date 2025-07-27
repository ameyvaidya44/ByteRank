import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Keyboard, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const shortcuts = [
  {
    keys: ["Ctrl", "Enter"],
    description: "Run Code",
    action: "Execute your code"
  },
  {
    keys: ["Ctrl", "B"],
    description: "Debug Code",
    action: "Get AI debugging assistance"
  },
  {
    keys: ["Ctrl", "/"],
    description: "Comment/Uncomment",
    action: "Toggle line comment"
  },
  {
    keys: ["Ctrl", "S"],
    description: "Save Code",
    action: "Save your current code"
  },
  {
    keys: ["Ctrl", "Z"],
    description: "Undo",
    action: "Undo last change"
  },
  {
    keys: ["Ctrl", "Y"],
    description: "Redo",
    action: "Redo last undone change"
  }
];

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{shortcut.description}</div>
                <div className="text-xs text-muted-foreground">{shortcut.action}</div>
              </div>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <div key={keyIndex} className="flex items-center">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      {key}
                    </Badge>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-muted-foreground">+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;