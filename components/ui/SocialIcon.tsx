import { Github, Linkedin, LucideMail } from 'lucide-react'

export const SocialIcon = ({
  platform,
  className = 'w-5 h-5',
}: {
  platform: string
  className?: string
}) => {
  switch (platform) {
    case 'github':
      return <Github className={className} aria-hidden="true" />
    case 'linkedin':
      return <Linkedin className={className} aria-hidden="true" />
    case 'email':
      return <LucideMail className={className} aria-hidden="true" />
    default:
      return null
  }
}
