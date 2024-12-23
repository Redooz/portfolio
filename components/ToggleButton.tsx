import * as React from "react"
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

interface ToggleButtonProps {
  isProVersion: boolean
  onToggle: () => void
}

export function ToggleButton({ isProVersion, onToggle }: ToggleButtonProps) {
  return (
    <div className="flex items-stretch space-x-2 bg-[#313244] p-2 pl-3 pr-4 rounded-full sm:bg-transparent">
      <Switch
        id="pro-mode"
        checked={isProVersion}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-[#cba6f7] data-[state=unchecked]:bg-[#45475a]"
      />
      <Label
        htmlFor="pro-mode"
        className="cursor-pointer select-none"
      >
        {isProVersion ? 'Activate Text Version' : 'Activate Terminal Version'}
      </Label>
    </div>
  )
}