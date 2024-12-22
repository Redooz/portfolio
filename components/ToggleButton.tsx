import * as React from "react"
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

interface ToggleButtonProps {
  isProVersion: boolean
  onToggle: () => void
}

export function ToggleButton({ isProVersion, onToggle }: ToggleButtonProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="pro-mode" 
        checked={isProVersion} 
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-[#cba6f7] data-[state=unchecked]:bg-[#45475a]"
      />
      <Label
        htmlFor="pro-mode" 
        className="text-[#cdd6f4] cursor-pointer select-none"
      >
        {isProVersion ? 'Pro Version' : 'Simple Version'}
      </Label>
    </div>
  )
}

