import { Github, Linkedin, LucideMail } from 'lucide-react'

export const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'github':
      return <Github className="w-5 h-5" />
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />
    case 'email':
      return <LucideMail className="w-5 h-5" />
    default:
      return null
  }
}

